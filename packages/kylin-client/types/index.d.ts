import Client from "./client";
import { KylinConfig, QueryOptions, Result } from "./types";
declare const client: Client;
export default client;
export declare function config(kylinConfig?: KylinConfig): void;
export declare function query(options: QueryOptions, kylinConfig?: KylinConfig): Promise<Result>;
