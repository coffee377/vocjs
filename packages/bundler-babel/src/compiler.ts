import { transformFile, TransformOptions } from '@babel/core';
import { CALLER } from './transform';

const compile = (filename: string, opts?: TransformOptions) => {
  return new Promise((resolve, reject) => {
    transformFile(filename, { ...opts, caller: CALLER }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export default compile;
