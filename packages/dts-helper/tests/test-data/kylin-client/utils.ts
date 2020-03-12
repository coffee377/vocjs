import { extend, RequestMethod } from 'umi-request';
import { Base64 } from 'js-base64';
import { KylinConfig, RawResult, Result, WrapperResult } from './types';

/**
 * @internal
 */
export const DefaultKylinConfig: KylinConfig = {
  https: false,
  host: 'localhost',
  port: 7070,
  queryApiPath: '/kylin/api/query',
  username: 'ADMIN',
  password: 'KYLIN',
  rawData: false,
};

/**
 * @internal
 * @param config
 */
const urlPrefix = (config: KylinConfig) => {
  const { https, host, port } = config;
  const prefix = https ? 'https' : 'http';
  return `${prefix}://${host}:${port > 0 ? port : 80}`;
};

/**
 * @internal
 * @param config
 */
const authorization = (config: KylinConfig) => {
  const { username, password } = config;
  const base64 = Base64.encode(`${username}:${password}`);
  return `Basic ${base64}`;
};

/**
 * @internal
 * @param kylinConfig
 */
export const kylinRequest = (kylinConfig: KylinConfig): RequestMethod =>
  extend({
    method: 'POST',
    /* API 前缀 */
    prefix: urlPrefix(kylinConfig),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authorization(kylinConfig),
    },
    credentials: 'include',
  });

/**
 * @internal
 */
type TransformFn = (result: Result, rawData: boolean) => Result;

/**
 * @internal
 * @param result
 * @param rawData
 */
export const transformResult: TransformFn = (result, rawData = false) => {
  if (!rawData) {
    const { exception, exceptionMessage, isException, columnMetas, results } = result as RawResult;
    const wrapper: WrapperResult = { message: 'SUCCESS', success: true };
    wrapper['success'] = !isException;
    wrapper['message'] = exceptionMessage || exception || 'SUCCESS';
    wrapper['columnNames'] = columnMetas.map(meta => meta.label || meta.name) || [];
    wrapper['columnValues'] = results || [];
    return wrapper;
  }
  return result;
};
