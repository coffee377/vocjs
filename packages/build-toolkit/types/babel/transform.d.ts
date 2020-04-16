import { TransformOptions } from '@babel/core';
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
/**
 * 代码编译转换
 * @param code
 * @param opts
 */
declare const transform: (code: ICode, opts?: TransformOptions) => import("@babel/core").BabelFileResult;
export default transform;
