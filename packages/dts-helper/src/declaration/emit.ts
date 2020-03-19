import path from 'path';
import { merge } from 'lodash';
import { getConfig, TSConfig } from '../utils/tsconfig';
import getDeclarationFiles, { DeclarationFile } from './source';
import { DEFAULT_OPTS, IOptions } from '../options';
import single from './single';
import multiple from './multiple';

export function run(tsconfig: TSConfig, options: IOptions) {
  const { outFile } = options;
  const { basePath } = tsconfig;

  // 1. 原始声明文件
  const declarationFiles = getDeclarationFiles(tsconfig) as DeclarationFile[];

  // 2. emit out a single file
  if (outFile) {
    if (declarationFiles && declarationFiles.length > 0) {
      return single(declarationFiles[0], basePath);
    }
    return Promise.resolve();
  }

  // 3. emit out multiple file
  return multiple(declarationFiles, basePath);
}

export default function(options: Partial<IOptions> = {}) {
  const root = path.resolve() || process.cwd();

  const opts: IOptions = merge({}, DEFAULT_OPTS, options);

  const tsconfig = getConfig(root, opts);

  return run(tsconfig, opts);
}
