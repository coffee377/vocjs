import { IMethodProcess } from "../server/rpc-server";
export interface GrpcServiceOptions {
    /**
     * @description 描述性文件
     */
    descriptor?: string;
    /**
     * @description 服务名称
     */
    serviceName: string;
    /**
     * @description 方法名称
     */
    methodName?: string;
    method?: IMethodProcess;
}
export declare function GrpcService(opts: GrpcServiceOptions): (target: any) => void;
