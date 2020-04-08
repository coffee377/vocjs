import { BaseOptions, DEFAULT_PROTO_LOADER_OPTIONS } from '../option';

export interface ServerOptions extends BaseOptions {}

const DEFAULT_SERVER_OPTIONS: ServerOptions = {
  host: 'localhost',
  port: 50051,
  loader: DEFAULT_PROTO_LOADER_OPTIONS,
};

export { DEFAULT_SERVER_OPTIONS };
