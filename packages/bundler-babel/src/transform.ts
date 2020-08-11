import { transform as babelTransform, TransformOptions } from '@babel/core';

const CALLER = {
  name: '@vocjs/bundler-babel',
};

/**
 * 代码编译转换
 * @param filename
 * @param code
 * @param opts
 */
const transform = (filename: string, code: string, opts?: TransformOptions) => {
  return new Promise((resolve, reject) => {
    babelTransform(code, { ...opts, caller: CALLER, filename }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export default transform;

export { CALLER };
