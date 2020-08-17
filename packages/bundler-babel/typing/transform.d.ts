import { TransformOptions } from '@babel/core';
declare const CALLER: {
    name: string;
};
declare const transform: (filename: string, code: string, opts?: TransformOptions) => Promise<unknown>;
export default transform;
export { CALLER };
