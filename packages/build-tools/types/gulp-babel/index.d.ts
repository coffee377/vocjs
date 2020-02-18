import { TransformOptions } from '@babel/core';
import stream from 'stream';
// declare module 'gulp-babel' {
//   function babel(options?: TransformOptions): NodeJS.ReadWriteStream;
//   export = babel;
// }

export default function babel(options?: TransformOptions): stream.Transform;
