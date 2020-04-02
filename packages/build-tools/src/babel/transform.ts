import { BabelFileResult, transform as babelTransform, TransformOptions } from '@babel/core';

export interface ITransformOpts {
  file: {
    contents: string;
    path: string;
  };
  babelTransformOptions: TransformOptions;
}

const CALLER = {
  name: 'build-tools',
};

/**
 * 代码编译转换
 * @param opts
 */
const transform = (opts: ITransformOpts): BabelFileResult => {
  const { file, babelTransformOptions } = opts;
  if (file.contents && file.path) {
    return babelTransform(file.contents, {
      ...babelTransformOptions,
      filename: file.path,
      babelrc: false,
      caller: CALLER,
    });
  }
  return null;
};

export default transform;
