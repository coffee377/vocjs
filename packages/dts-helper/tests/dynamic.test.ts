import path from 'path';
import fs from 'fs-extra';
import { Application, SourceFileMode, TSConfigReader, TypeDocAndTSOptions, resetReflectionID } from 'typedoc';
import { CallbackLogger } from 'typedoc/dist/lib/utils';
import ReflectionFormatter from '../src/render/reflection-formatter';

function createApplication(logOutput: string[]) {
  const options: Partial<TypeDocAndTSOptions> = {
    tsconfig: path.resolve(__dirname, '../tsconfig.json'),
    // ignoreCompilerErrors: true,
    includeDeclarations: false,
    excludeExternals: true,
    mode: SourceFileMode.File,
  } as Partial<TypeDocAndTSOptions>;

  const app = new Application();

  app.logger = new CallbackLogger((message: string) => {
    logOutput.push(message);
  });

  app.options.addReader(new TSConfigReader());

  app.bootstrap(options);

  return app;
}

const writeOutput = process.env['DEBUG_MODE'] !== 'none';

const testFiles = ['src/options.ts'];

describe('Dynamic test suite', () => {
  test.each(testFiles)('execute test: %s', testFile => {
    const logOutput: string[] = [];
    const app = createApplication(logOutput);

    resetReflectionID();

    const project = app.convert([path.join(__dirname, '..', testFile)]);
    const basename = testFile.replace(/(\.d)?\.ts$/i, '');

    if (project) {
      const outBase = path.resolve(__dirname, '../output');
      const outputSuffix = /exact\.d\.ts$/i.test(testFile) ? 'exact' : 'output';
      const outputJsonFile = `${path.join(outBase, basename)}-${outputSuffix}.json`;
      const outputDeclarationFile = `${path.join(outBase, basename)}-${outputSuffix}.d.ts`;

      if (writeOutput) {
        fs.ensureFileSync(outputJsonFile);
        fs.writeFileSync(outputJsonFile, JSON.stringify(app.serializer.toObject(project), null, '  '));
      }

      const formatter = ReflectionFormatter.instance();
      const result = formatter.render();

      if (writeOutput) {
        fs.ensureFileSync(outputDeclarationFile);
        fs.writeFileSync(outputDeclarationFile, result);
      }
    }
  });
});
