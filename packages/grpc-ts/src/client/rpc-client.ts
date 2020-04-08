import * as grpc from 'grpc';
import { ClientReadableStream, ClientWritableStream, ServerDuplexStream } from 'grpc';
import * as lodash from 'lodash';
import * as protoLoader from '@grpc/proto-loader';
import { ClientOptions, DEFAULT_CLIENT_OPTIONS } from './options';

abstract class RpcClient<RequestType = any, ResponseType = any> {
  private readonly serviceClient: any;

  private readonly clientOptions: ClientOptions;

  constructor(opts?: Partial<ClientOptions>) {
    this.init();
    this.clientOptions = lodash.merge({}, DEFAULT_CLIENT_OPTIONS, opts) as ClientOptions;
    const packageDefinition = protoLoader.loadSync(this.descriptor(), this.clientOptions.loader);
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
    const Client = lodash.get(protoDescriptor, this.serviceName());
    const address = `${this.clientOptions.host}:${this.clientOptions.port}`;
    this.serviceClient = new Client(address, grpc.credentials.createInsecure());
  }

  private init() {
    if (!this.descriptor()) {
      throw new Error('描述性文件');
    }
    if (!this.serviceName()) {
      throw new Error('服务名称');
    }
  }

  /**
   * @description protobuf 描述性文件
   */
  abstract descriptor(): string;

  /**
   * @description 服务名称，含包的名称
   */
  abstract serviceName(): string;

  async exec(methodName: string, request?: RequestType): Promise<ResponseType> {
    const method = this.serviceClient[methodName];
    const { requestStream, responseStream } = method;
    let result: Promise<ResponseType>;
    if (requestStream && responseStream) {
      result = this.duplexStream(method, request);
    } else if (requestStream && !responseStream) {
      result = this.readableStream(method, request);
    } else if (!requestStream && responseStream) {
      result = this.writableStream(method, request);
    } else {
      result = this.unaryCall(method, request);
    }
    return result;
  }

  private unaryCall(method: Function, request?: RequestType): Promise<ResponseType> {
    return new Promise(async (resolve, reject) => {
      method.call(this.serviceClient, request, async (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  private readableStream(method: Function, request?: RequestType): Promise<ResponseType> {
    return new Promise<ResponseType>(async (resolve, reject) => {
      // eslint-disable-next-line consistent-return
      const call: ClientWritableStream<RequestType> = method.call(this.serviceClient, async (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
      call.on('error', e => {
        reject(e);
        call.end && call.end();
      });
      call.write(request);
      call.end();
    });
  }

  private writableStream(method: Function, request?: RequestType): Promise<ResponseType> {
    return new Promise<ResponseType>(async (resolve, reject) => {
      const call: ClientReadableStream<ResponseType> = method.call(this.serviceClient, request);

      call.on('error', e => {
        reject(e);
      });

      call.on('data', async chunk => {
        resolve(chunk);
      });
    });
  }

  private duplexStream(method: Function, request?: RequestType): Promise<ResponseType> {
    const call: ServerDuplexStream<RequestType, ResponseType> = method.call(this.serviceClient);
    return new Promise<ResponseType>(async (resolve, reject) => {
      let result: any;
      let error: any;

      call.write(request);
      call.end();

      call.on('data', async chunk => {
        result = chunk;
        call.end();
      });
      call.on('end', () => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
      call.on('error', e => {
        error = e;
        call.end();
      });
    });
  }

  private close() {
    this.serviceClient.close();
  }
}

export default RpcClient;
