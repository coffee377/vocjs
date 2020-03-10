import { RequestMethod } from 'umi-request';
import { KylinConfig, Result } from './types';
export declare const DefaultKylinConfig: KylinConfig;
export declare const kylinRequest: (kylinConfig: KylinConfig) => RequestMethod<false>;
declare type TransformFn = (result: Result, rawData: boolean) => Result;
export declare const transformResult: TransformFn;
export {};
