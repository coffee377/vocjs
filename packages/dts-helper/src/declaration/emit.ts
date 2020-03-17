import path from 'path';
import { merge } from 'lodash';
import { getConfig, TSConfig } from '../utils/tsconfig';
import getDeclarationFiles from './source';
import { DEFAULT_OPTS, IOptions } from '../options';
import single from './single';
import multiple from './multiple';

function emit(tsconfig: TSConfig, options: IOptions) {
  const { outFile } = options;
  const { basePath } = tsconfig;

  // 1. 原始声明文件
  const declarationFiles = getDeclarationFiles(tsconfig);

  // 2. emit out a single file
  if (outFile) {
    return single(declarationFiles[0], basePath);
  }

  // 3. emit out multiple file
  return multiple(declarationFiles, basePath);
}

export default function(options: Partial<IOptions> = {}) {
  const rooNames = path.resolve() || process.cwd();

  const opts: IOptions = merge({}, DEFAULT_OPTS, options);

  const tsconfig = getConfig(rooNames, opts);

  return emit(tsconfig, opts);
}
