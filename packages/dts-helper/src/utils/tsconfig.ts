import ts from 'typescript';
import { resolve, dirname } from 'path';
import { existsSync, statSync } from 'fs-extra';
import { merge } from 'lodash';
import minimatch from 'minimatch';
import { TsError } from './error';
import { IOptions } from '../options';
import { resolveFileName, slash } from './index';

function isFile(file: string) {
  return existsSync(file) && statSync(file).isFile();
}

export interface TSConfig {
  basePath: string;
  files: string[];
  compilerOptions: ts.CompilerOptions;
  options: IOptions;
}

/**
 * 读取配置文件
 * @param file
 */
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

  const basePath = dirname(fileToRead);

  const configParseResult = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    basePath,
    {},
    fileToRead,
  ) as ts.ParsedCommandLine;

  if (configParseResult.errors && configParseResult.errors.length) {
    throw TsError(configParseResult.errors);
  }
  const { fileNames, options } = configParseResult;
  return { basePath, files: fileNames, compilerOptions: options, options: undefined };
};

function getOutFile(outFile: string | boolean): string {
  let file = 'index.d.ts';
  if (outFile && typeof outFile === 'string') {
    file = outFile;
    file = file.endsWith('.d.ts') ? file : `${file}.d.ts`;
  }
  return file;
}

function getModulePrefix(base: string, prefix: boolean | string): string {
  // eslint-disable-next-line import/no-dynamic-require
  const { name } = require(`${base}/package.json`);
  if (prefix && typeof prefix === 'string') {
    return prefix;
  }
  return name;
}

const mergeConfig = (tsConfig: TSConfig, options: IOptions): TSConfig => {
  const { include, exclude, outFile, modulePrefix, outDir, removeComments, noEmit } = options;

  const { basePath, compilerOptions } = tsConfig;

  const baseDir = basePath;
  const excludeMap: { [filename: string]: boolean } = {};
  let result: Set<string> = new Set<string>();
  let { files } = tsConfig;

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

  const newCompilerOptions: ts.CompilerOptions = {
    declaration: true,
    emitDeclarationOnly: true,
    declarationDir: outDir,
    removeComments,
    noEmit,
  };

  if (outFile) {
    newCompilerOptions['outFile'] = getOutFile(outFile);
  }

  if (modulePrefix) {
    options['modulePrefix'] = getModulePrefix(baseDir, modulePrefix);
  }

  const finalCompilerOptions = merge({}, compilerOptions, newCompilerOptions) as ts.CompilerOptions;

  // 冲突时剔除输出目录
  if (finalCompilerOptions.outFile && finalCompilerOptions.declarationDir) {
    delete finalCompilerOptions.declarationDir;
  }

  return { basePath, files, compilerOptions: finalCompilerOptions, options };
};

const getConfig = (file: string, options: IOptions): TSConfig => {
  let filename: string = file;
  if (!filename) {
    const { baseDir, tsConfig } = options;
    filename = resolveFileName(tsConfig, baseDir);
  }
  return mergeConfig(readConfig(filename), options);
};

export { readConfig, mergeConfig, getConfig };
