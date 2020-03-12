import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import { Application, resetReflectionID, SourceFileMode, TypeDocAndTSOptions } from 'typedoc';
import Emit from '../src/render/dts-render/output/Emit';
import { ReflectionFormatter } from '../src/render/dts-render';

function createApplication() {
  const options: Partial<TypeDocAndTSOptions> = {
    tsconfig: path.resolve(__dirname, '../tsconfig.json'),
    ignoreCompilerErrors: false,
    includeDeclarations: false,
    exclude: ['**/node_modules/**', '**/*.+(spec|test|d).ts'],
    excludeExternals: true,
    stripInternal: true,
    mode: SourceFileMode.File,
    plugin: ['none'],
  } as Partial<TypeDocAndTSOptions>;

  const app = new Application();

  // app.logger = new CallbackLogger((message: string) => {
  //   logOutput.push(message);
  // });

  // app.options.addReader(new TSConfigReader());

  const { inputFiles, hasErrors } = app.bootstrap(options);

  return app;
}

const writeOutput = process.env['DEBUG_MODE'] !== 'none';

const files = ['test-data/**/*.ts']
  .map(f => glob.sync(f, { cwd: __dirname }))
  .flat()
  .map(f => [f]);

test('kylin-client', () => {

  const app = createApplication();

  resetReflectionID();

  const relative = '../../kylin-client';
  const src = [path.resolve(__dirname, relative)];

  const inputFiles = app.expandInputFiles(src);

  const project = app.convert(inputFiles);
  console.log(relative, project === undefined);
});

describe('test data', () => {
  test.each(files)('%s', testFile => {
    const app = createApplication();

    resetReflectionID();

    const inputFiles = app.expandInputFiles([path.resolve(__dirname, testFile)]);

    // expect(fs.existsSync(path.join(__dirname, testFile))).toBe(true);

    const project = app.convert(inputFiles);

    // console.log(testFile, project === undefined);

    const basename = testFile.replace(/(\.d)?\.ts$/i, '');

    if (project) {
      const outBase = path.resolve(__dirname, '../output');
      const outputSuffix = /exact\.d\.ts$/i.test(testFile) ? 'exact' : 'output';
      const outputJsonFile = `${path.join(outBase, basename)}-${outputSuffix}.json`;
      const outputDeclarationFile = `${path.join(outBase, basename)}-${outputSuffix}.d.ts`;

      if (writeOutput) {
        const emit = Emit.of(project);
        // emit.writeSingleFile(outBase, true);
        // emit.writeMultipleFile(outBase, "types");

        fs.ensureFileSync(outputJsonFile);
        fs.writeFileSync(outputJsonFile, JSON.stringify(app.serializer.toObject(project), null, '  '));

        /* 验证测试 ReflectionFormatter */
        const formatter = ReflectionFormatter.instance();
        const result = formatter.render(project);

        fs.ensureFileSync(outputDeclarationFile);
        fs.writeFileSync(outputDeclarationFile, result);
      }
    }
  });
});
