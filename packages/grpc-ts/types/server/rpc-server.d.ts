import { ServiceDefinition, UntypedServiceImplementation } from 'grpc';
import { ServerOptions } from "./options";
import { GrpcServiceOptions } from "../decorator/GrpcService";
export declare type IMethodProcess<RequestType = any, ResponseType = any> = (request?: RequestType) => ResponseType;
declare type IMethod<RequestType, ResponseType> = Record<string, IMethodProcess<RequestType, ResponseType>>;
interface IService<RequestType, ResponseType> {
    name: string;
    methods: IMethod<RequestType, ResponseType>;
}
declare class RpcServer<RequestType = any, ResponseType = any> {
    private server;
    private readonly serverOptions;
    private readonly services;
    private readonly services1;
    constructor(opts?: Partial<ServerOptions>);
    protected getServiceDefinition(descriptor: string, serviceName: string): ServiceDefinition<UntypedServiceImplementation>;
    protected addService(descriptor: string, service: IService<RequestType, ResponseType>): void;
    protected getServiceImplementation(descriptor: string, serviceDefinition: ServiceDefinition<UntypedServiceImplementation>, methods: IMethod<RequestType, ResponseType>): UntypedServiceImplementation;
    private addMethod;
    protected registerMethod(serviceOptions: GrpcServiceOptions): void;
    start(): void;
    private unaryCall;
    private readableStream;
    private writableStream;
    private duplexStream;
}
export default RpcServer;
