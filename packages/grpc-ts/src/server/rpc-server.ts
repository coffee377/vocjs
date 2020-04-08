import grpc, {
  GrpcObject,
  handleBidiStreamingCall,
  handleCall,
  handleClientStreamingCall,
  handleServerStreamingCall,
  handleUnaryCall,
  Server,
  ServerCredentials,
  ServerDuplexStream,
  ServiceDefinition,
  UntypedServiceImplementation,
} from 'grpc';
import * as lodash from 'lodash';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';
import { DEFAULT_SERVER_OPTIONS, ServerOptions } from './options';
import { GrpcServiceOptions } from '../decorator/GrpcService';

export type IMethodProcess<RequestType = any, ResponseType = any> = (request?: RequestType) => ResponseType;

type IMethod<RequestType, ResponseType> = Record<string, IMethodProcess<RequestType, ResponseType>>;

interface IService<RequestType, ResponseType> {
  name: string;
  methods: IMethod<RequestType, ResponseType>;
}

class RpcServer<RequestType = any, ResponseType = any> {
  private server: Server;

  private readonly serverOptions: ServerOptions;

  private readonly services: Map<string, IService<RequestType, ResponseType>>;

  private readonly services1: GrpcServiceOptions[];

  constructor(opts: Partial<ServerOptions> = {}) {
    this.server = new Server();
    this.serverOptions = lodash.merge({}, DEFAULT_SERVER_OPTIONS, opts);
    this.services = new Map<string, IService<RequestType, ResponseType>>();
    this.services1 = [];
  }

  protected getServiceDefinition(
    descriptor: string,
    serviceName: string,
  ): ServiceDefinition<UntypedServiceImplementation> {
    const filename = path.resolve(descriptor);
    const packageDefinition = protoLoader.loadSync(filename, this.serverOptions.loader);
    const protoDescriptor: GrpcObject = grpc.loadPackageDefinition(packageDefinition);
    return lodash.get(protoDescriptor, `${serviceName}.service`);
  }

  protected addService(descriptor: string, service: IService<RequestType, ResponseType>) {
    const serviceDefinition = this.getServiceDefinition(descriptor, service.name);
    const implementation = this.getServiceImplementation(descriptor, serviceDefinition, service.methods);
    this.server.addService(serviceDefinition, implementation);
  }

  protected getServiceImplementation(
    descriptor: string,
    serviceDefinition: ServiceDefinition<UntypedServiceImplementation>,
    methods: IMethod<RequestType, ResponseType>,
  ): UntypedServiceImplementation {
    const implementation: UntypedServiceImplementation = this.services.get(descriptor) || {};
    Object.keys(methods).forEach(methodName => {
      const serviceProcess = methods[methodName];
      this.addMethod(serviceDefinition, implementation, methodName, serviceProcess);
    });
    return implementation;
  }

  private addMethod(
    serviceDefinition: ServiceDefinition<UntypedServiceImplementation>,
    implementation: UntypedServiceImplementation,
    methodName: string,
    methodProcess: IMethodProcess<RequestType, ResponseType>,
  ) {
    let method: handleCall<RequestType, ResponseType>;
    const { requestStream, responseStream } = serviceDefinition[methodName];
    if (requestStream && responseStream) {
      method = this.duplexStream(methodProcess);
    } else if (requestStream && !responseStream) {
      method = this.readableStream(methodProcess);
    } else if (!requestStream && responseStream) {
      method = this.writableStream(methodProcess);
    } else {
      method = this.unaryCall(methodProcess);
    }
    implementation[methodName] = method;
  }

  protected registerMethod(serviceOptions: GrpcServiceOptions) {
    const { descriptor, serviceName, methodName, method } = serviceOptions;
    let service = this.services.get(descriptor);
    if (!service) {
      service = { name: serviceName, methods: {} };
    }
    const { methods } = service;
    methods[methodName] = method;
    this.services.set(descriptor, service);
  }

  start() {
    this.services.forEach((service, descriptor) => {
      this.addService(descriptor, service);
    });
    const address = `${this.serverOptions.host}:${this.serverOptions.port}`;
    this.server.bind(address, ServerCredentials.createInsecure());
    this.server.start();
  }

  private unaryCall(
    methodProcess: IMethodProcess<RequestType, ResponseType>,
  ): handleUnaryCall<RequestType, ResponseType> {
    return (call, callback) => {
      const { request } = call;
      try {
        const response = methodProcess(request);
        callback(null, response);
      } catch (e) {
        callback(e, null);
      }
    };
  }

  private readableStream(
    methodProcess: IMethodProcess<RequestType, ResponseType>,
  ): handleClientStreamingCall<RequestType, ResponseType> {
    return (call, callback) => {
      let request = null;
      call.on('data', async chunk => {
        request = chunk;
      });
      call.on('end', () => {
        const response = methodProcess(request);
        callback(null, response);
      });
      call.on('error', err => {
        callback(err, null);
      });
    };
  }

  private writableStream(
    methodProcess: IMethodProcess<RequestType, ResponseType>,
  ): handleServerStreamingCall<RequestType, ResponseType> {
    return call => {
      const { request } = call;
      const response = methodProcess(request);
      if (response) {
        call.write(response);
      }
      call.end();
      call.on('error', e => {
        console.error(e);
        call.end();
      });
    };
  }

  private duplexStream(
    methodProcess: IMethodProcess<RequestType, ResponseType>,
  ): handleBidiStreamingCall<RequestType, ResponseType> {
    return (call: ServerDuplexStream<RequestType, ResponseType>) => {
      let request: RequestType;
      let response: ResponseType;
      // 读取数据
      call.on('data', async chunk => {
        request = chunk;
      });
      // 读取数据结束
      call.on('end', () => {
        response = methodProcess(request);
        if (response) {
          // 写数据
          call.write(response);
        }
        // 写数据结束
        call.end();
      });
      call.on('error', e => {
        console.error(e);
        call.end();
      });
    };
  }
}

export default RpcServer;
