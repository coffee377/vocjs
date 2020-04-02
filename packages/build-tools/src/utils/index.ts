import { join, basename, extname, dirname } from 'path';
import { existsSync, readFileSync } from 'fs';
import { readConfigFile } from 'typescript';
import { ModulesType } from '../types';

const getDestFolder = (modules: ModulesType): string => {
  let targetDir: string;
  switch (modules) {
    case 'esm':
      targetDir = 'es';
      break;
    case 'cjs':
      targetDir = 'lib';
      break;
    case 'umd':
    default:
      targetDir = 'dist';
  }
  return targetDir;
};

export interface FileOpts {
  cwd: string;
  files: string[];
  relative: boolean;
}

export const getExistFile = (fileOpts: FileOpts) => {
  const { cwd, files, relative } = fileOpts;
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    const absFilePath = join(cwd, file);
    if (existsSync(absFilePath)) {
      return relative ? file : absFilePath;
    }
  }
  return false;
};

export const isTypescript = filePath => filePath.match(/.tsx?$/);

const parseTypeScriptConfig = (path: string) => {
  const readFile = (path: string) => readFileSync(path, 'utf-8');
  const result = readConfigFile(path, readFile);
  if (result.error) {
    return result.error;
  }
  return result.config;
};

const withExtension = (filename: string, ext: string = '.js') => {
  const newBasename = basename(filename, extname(filename)) + ext;
  return join(dirname(filename), newBasename);
};

export { getDestFolder, withExtension };
