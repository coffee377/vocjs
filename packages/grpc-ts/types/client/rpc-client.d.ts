import { ClientOptions } from './options';
declare abstract class RpcClient<RequestType = any, ResponseType = any> {
  private readonly serviceClient;
  private readonly clientOptions;
  constructor(opts?: Partial<ClientOptions>);
  private init;
  /**
   * @description protobuf 描述性文件
   */
  abstract descriptor(): string;
  /**
   * @description 服务名称，含包的名称
   */
  abstract serviceName(): string;
  exec(methodName: string, request?: RequestType): Promise<ResponseType>;
  private unaryCall;
  private readableStream;
  private writableStream;
  private duplexStream;
  private close;
}
export default RpcClient;
