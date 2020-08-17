import { RequestMethod } from 'umi-request';
import { KylinConfig, Result } from "./types";
/**
 * @internal
 */
export declare const DefaultKylinConfig: KylinConfig;
/**
 * @internal
 * @param kylinConfig
 */
export declare const kylinRequest: (kylinConfig: KylinConfig) => RequestMethod;
/**
 * @internal
 */
declare type TransformFn = (result: Result, rawData: boolean) => Result;
/**
 * @internal
 * @param result
 * @param rawData
 */
export declare const transformResult: TransformFn;
export {};
