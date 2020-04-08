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

const DEFAULT_PROTO_LOADER_OPTIONS: Options = {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
} as Options;

export { DEFAULT_PROTO_LOADER_OPTIONS };
