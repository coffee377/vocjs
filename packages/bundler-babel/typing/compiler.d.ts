import { TransformOptions } from '@babel/core';
declare const compile: (filename: string, opts?: TransformOptions) => Promise<unknown>;
export default compile;
