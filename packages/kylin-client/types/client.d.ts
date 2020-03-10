import { KylinConfig, QueryOptions, Result } from './types';
export default class Client {
    private iConfig;
    constructor(config?: KylinConfig);
    config: (kylinConfig?: KylinConfig) => void;
    query: (options: QueryOptions, kylinConfig?: KylinConfig) => Promise<Result>;
}
