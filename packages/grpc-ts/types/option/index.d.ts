import { Options } from '@grpc/proto-loader';
export interface BaseOptions {
    /**
     * @description grpc bind host
     */
    host?: string;
    /**
     * @description grpc bind port
     */
    port?: number;
    /**
     * @description proto-loader options
     */
    loader?: Options;
}
declare const DEFAULT_PROTO_LOADER_OPTIONS: Options;
export { DEFAULT_PROTO_LOADER_OPTIONS };
