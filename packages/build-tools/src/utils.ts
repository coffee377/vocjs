import { join } from 'path';
import { existsSync, readFileSync, statSync } from 'fs';
import { readConfigFile } from 'typescript';
// eslint-disable-next-line import/no-unresolved
import { ModulesType } from './types';

export const getTargetPath: (cwd: string, modules: ModulesType) => string = (cwd, modules) => {
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
  return join(cwd, targetDir);
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

function getTSConfig() {
  // const tsconfigPath = join(cwd, 'tsconfig.json');
  // const templateTsconfigPath = join(__dirname, '../template/tsconfig.json');
  //
  // if (existsSync(tsconfigPath)) {
  //   return getTsconfigCompilerOptions(tsconfigPath) || {};
  // }
  // if (rootPath && existsSync(join(rootPath, 'tsconfig.json'))) {
  //   return getTsconfigCompilerOptions(join(rootPath, 'tsconfig.json')) || {};
  // }
  // return getTsconfigCompilerOptions(templateTsconfigPath) || {};
}
