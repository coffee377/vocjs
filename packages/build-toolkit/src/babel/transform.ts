import { transform as babelTransform, TransformOptions } from '@babel/core';

export interface ICode {
  /**
   * @description 文件路径
   */
  path: string;
  /**
   * @description 文件内容
   */
  contents: string;
}

const CALLER = {
  name: 'build-tools',
};

/**
 * 代码编译转换
 * @param code
 * @param opts
 */
const transform = (code: ICode, opts?: TransformOptions) => {
  const { path, contents } = code;
  if (path && contents) {
    return babelTransform(contents, {
      ...opts,
      filename: path,
      babelrc: false,
      caller: CALLER,
    });
  }
  return null;
};

export default transform;
