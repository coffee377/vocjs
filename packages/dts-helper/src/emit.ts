import ts from 'typescript';
import path from 'path';
import os from 'os';
import { IOptions } from './options';
import { getError, getFileNames, getTSConfig, slash, writeDeclarationFile } from './utils';

const DEFAULT_OPTS: IOptions = {
  // main: "",
  baseDir: '.',
  tsc: 'tsconfig.json',
  outDir: 'types',
  outFile: false,
  noEmit: false,
  exclude: ['**/*.d.ts'],
  eol: os.EOL,
  indent: '\t',
  verbose: false,
  log: msg => {
    console.log(msg);
  },
};

const generate = async (options: Partial<IOptions>) => {
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const main = require(path.resolve('./package.json')).name;
  const opts: IOptions = { ...DEFAULT_OPTS, ...options };

  if (!opts.outDir) {
    opts.outDir = 'types';
  }
  if (!opts.main) {
    opts.main = main;
  }
  const { baseDir, log, tsc } = opts;

  let files: string[] = [];
  let compilerOptions: ts.CompilerOptions = {};

  const tsConfigFile = path.resolve(baseDir, tsc);

  // log(tsConfigFile);

  /**
   * 待转换文件与边缘配置
   */
  [files, compilerOptions] = getTSConfig(tsConfigFile, opts);

  const host = ts.createCompilerHost(compilerOptions) as ts.CompilerHost;

  // console.log('getCurrentDirectory', host.getCurrentDirectory());
  // console.log('getDefaultLibLocation', host.getDefaultLibLocation());
  // console.log('getDefaultLibFileName', host.getDefaultLibFileName(compilerOptions));
  // console.log('files', files);

  // const filenames = getFileNames(baseDir, files);
  // log(filenames);
  // console.log('compilerOptions', compilerOptions);

  const program = ts.createProgram(files, compilerOptions, host) as ts.Program;

  // const dts: Map<string, string> = new Map<string, string>();

  const declarationFiles: ts.SourceFile[] = [];

  function writeFile(filename: string, data: string) {
    if (filename.slice(-5) !== '.d.ts') {
      return;
    }

    const sourceFile = ts.createSourceFile(filename, data, compilerOptions.target, true) as ts.SourceFile;
    declarationFiles.push(sourceFile);
  }

  program
    .getSourceFiles()
    .filter(sourceFile => sourceFile.fileName.slice(-5) !== '.d.ts')
    .forEach(sourceFile => {
      // 所有相关文件都在这里，包括声明文件
      const emitOutput = program.emit(sourceFile, writeFile, undefined, true);
      if (emitOutput.emitSkipped || emitOutput.diagnostics.length > 0) {
        throw getError(
          emitOutput.diagnostics
            .concat(program.getSemanticDiagnostics(sourceFile))
            .concat(program.getSyntacticDiagnostics(sourceFile))
            .concat(program.getDeclarationDiagnostics(sourceFile)),
        );
      }
    });

  // declarationFiles.forEach(s => console.log('排序前', s.fileName));
  // todo 按文件名排序
  declarationFiles.sort((s1, s2) => s1.fileName.localeCompare(s2.fileName));
  // declarationFiles.forEach(s => console.log('排序后', s.fileName));

  return writeDeclarationFile(declarationFiles, opts);
};

export default generate;
