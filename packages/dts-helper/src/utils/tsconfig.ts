import ts from 'typescript';
import { resolve, dirname } from 'path';
import { existsSync, statSync } from 'fs-extra';
import { merge } from 'lodash';
import minimatch from 'minimatch';
import { TsError } from './error';
import { IOptions } from '../options';
import { slash } from './index';

function isFile(file: string) {
  return existsSync(file) && statSync(file).isFile();
}

export type TSConfig = [string[], ts.CompilerOptions];

const readConfig = (file: string): TSConfig => {
  let fileToRead: string | undefined = file;
  if (!isFile(fileToRead)) {
    fileToRead = ts.findConfigFile(file, isFile);
  }

  if (!fileToRead || !isFile(fileToRead)) {
    throw new Error(`The tsconfig file couldn't found`);
  }

  fileToRead = resolve(fileToRead);

  const { config, error } = ts.readConfigFile(fileToRead, ts.sys.readFile);

  if (error) {
    throw TsError([error as ts.Diagnostic]);
  }

  const configParseResult = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    dirname(fileToRead),
    {},
    fileToRead,
  ) as ts.ParsedCommandLine;

  if (configParseResult.errors && configParseResult.errors.length) {
    throw TsError(configParseResult.errors);
  }
  const { fileNames, options } = configParseResult;
  return [fileNames, options];
};

const mergeConfig = (tsConfig: TSConfig, options: IOptions): TSConfig => {
  const { include, exclude, outDir, removeComments, noEmit } = options;
  const { configFilePath } = tsConfig[1] as ts.CompilerOptions;
  const baseDir = dirname(configFilePath as string);
  const excludeMap: { [filename: string]: boolean } = {};
  let result: Set<string> = new Set<string>();
  let files = tsConfig[0];

  if (include && include.length > 0) {
    include.forEach(pattern => {
      minimatch.match(files, slash(resolve(baseDir, pattern)), {}).forEach(file => {
        result.add(file);
      });
    });
  } else {
    result = new Set<string>(files);
  }

  if (exclude && exclude.length > 0) {
    exclude.forEach(pattern => {
      minimatch.match(files, slash(resolve(baseDir, pattern)), {}).forEach(file => {
        excludeMap[file] = true;
      });
    });
    files = Array.from(result).filter(file => !(excludeMap[file] && excludeMap[file] === true));
  } else {
    files = Array.from(result);
  }

  const opts: ts.CompilerOptions = {
    declaration: true,
    emitDeclarationOnly: true,
    declarationDir: outDir,
    removeComments,
    noEmit,
  };

  const compilerOptions = merge({}, tsConfig[1], opts);

  return [files, compilerOptions];
};

const getConfig = (file: string, options: IOptions): TSConfig => mergeConfig(readConfig(file), options);

export { readConfig, mergeConfig, getConfig };
