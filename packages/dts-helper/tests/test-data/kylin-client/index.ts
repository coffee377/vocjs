import Client from './client';
import { KylinConfig, QueryOptions, Result } from './types';

const client = new Client();

export default client;

export function config(kylinConfig?: KylinConfig) {
  client.config(kylinConfig);
}

export function query(options: QueryOptions, kylinConfig?: KylinConfig): Promise<Result> {
  return client.query(options, kylinConfig);
}
