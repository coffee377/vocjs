/**
 * This is the doc comment for client.ts
 * @packageDocumentation
 */

import { KylinConfig, QueryOptions, Result, WrapperResult } from './types';
import { DefaultKylinConfig, kylinRequest, transformResult } from './utils';

export default class Client {
  private iConfig: KylinConfig;

  constructor(config?: KylinConfig) {
    this.iConfig = { ...config, ...DefaultKylinConfig };
  }

  config = (kylinConfig?: KylinConfig) => {
    this.iConfig = { ...this.iConfig, ...kylinConfig };
  };

  query = async (options: QueryOptions, kylinConfig?: KylinConfig): Promise<Result> => {
    const config: KylinConfig = { ...this.iConfig, ...kylinConfig };
    const request = kylinRequest(config);
    return request(config.queryApiPath, { data: options })
      .then(data => {
        const rawData = config.rawData || false;
        return Promise.resolve<Result>(transformResult(data, rawData));
      })
      .catch(err => {
        const wrapper: WrapperResult = { success: false, message: 'error' };
        if (err && err.response && err.response.statusText) {
          wrapper['message'] = err.response.statusText;
        }
        if (err && err.data && err.data.exception) {
          wrapper['message'] = err.data.exception;
        }
        return Promise.resolve<Result>(wrapper);
      });
  };

  // querySync = (opts: QueryOptions, kylinConfig?: KylinConfig) => {
  //   throw new Error('暂未实现同步查询方法');
  // };
}
