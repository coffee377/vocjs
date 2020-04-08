import { BaseOptions, DEFAULT_PROTO_LOADER_OPTIONS } from '../option';

export interface ClientOptions extends BaseOptions {}

const DEFAULT_CLIENT_OPTIONS: ClientOptions = {
  host: 'localhost',
  port: 50051,
  loader: DEFAULT_PROTO_LOADER_OPTIONS,
};

export { DEFAULT_CLIENT_OPTIONS };
