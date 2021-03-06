// declare namespace Kylin {
//
//   class ResultTransform<R, W> {
//     // constructor() {}
//     static of(a:T): R;
//   }
//
//   type Request = { method: string; path: string };
//   type User = { username: string; password: string };
//
//   type Result<R = any> = R;
//
//   /** 包装响应结果 */
//   export interface WrapperResult<T = any> {
//     /**
//      * 是否成功
//      */
//     success: boolean;
//
//     /**
//      * 错误信息
//      */
//     message: string;
//
//     /**
//      * 响应数据
//      */
//     data?: T;
//   }
//
//   // type Result<R = any, W = any> = RawResult<R> | WrapperResult<W>;
//
//   interface API {
//     Query: {
//       Authentication: string;
//     };
//     CUBE: {};
//     JOB: {};
//     Metadata: {};
//     Cache: {};
//     Streaming: {};
//   }
//
//   /** 客户端配置 */
//   export interface KylinConfig {
//     /**
//      * @description 是否 https 服务
//      * @default false
//      */
//     https?: boolean;
//
//     /**
//      * @description 主机名或 IP
//      * @default localhost
//      */
//     host?: string;
//
//     /**
//      * @description 端口号
//      * @default 7070
//      */
//     port?: number;
//
//     /**
//      * @description 查询 api 路径地址
//      * @default /kylin/api/query
//      */
//     api?: any;
//
//     /**
//      * @description 用户名
//      * @default ADMIN
//      */
//     username?: string;
//
//     /**
//      * @description 密码
//      * @default KYLIN
//      */
//     password?: string;
//
//     /**
//      * @description 是否响应原始数据
//      * @default false
//      */
//     rawData?: boolean;
//   }
//
//   namespace CUBE {}
//   namespace JOB {}
//   namespace Metadata {}
//   namespace Cache {}
//   namespace Streaming {}
// }
//
// /**
//  * Query
//  */
// declare namespace Kylin {
//   namespace Query {
//     export function authentication(user: User): Promise<any>;
//     export function query(u: any): Promise<any>;
//   }
// }
//
// export = Kylin;

// declare module 'kylin-client' {
//
//   /** 客户端配置 */
//   export interface KylinConfig {
//     /**
//      * @description 是否 https 服务
//      * @default false
//      */
//     https?: boolean;
//
//     /**
//      * @description 主机名或 IP
//      * @default localhost
//      */
//     host?: string;
//
//     /**
//      * @description 端口号
//      * @default 7070
//      */
//     port?: number;
//
//     /**
//      * @description 查询 api 路径地址
//      * @default /kylin/api/query
//      */
//     queryApiPath?: string;
//
//     /**
//      * @description 用户名
//      * @default ADMIN
//      */
//     username?: string;
//
//     /**
//      * @description 密码
//      * @default KYLIN
//      */
//     password?: string;
//
//     /**
//      * @description 是否响应原始数据
//      * @default false
//      */
//     rawData?: boolean;
//   }
//
//   /** 查询配置 */
//   export interface QueryOptions {
//     /**
//      * required string The text of sql statement.
//      */
//     sql: string;
//     /**
//      * optional int Query offset. If offset is set in sql, curIndex will be ignored.
//      */
//     offset?: number;
//     /**
//      * optional int Query limit. If limit is set in sql, perPage will be ignored.
//      */
//     limit?: number;
//     /**
//      * optional bool Whether accept a partial result or not, default be “false”. Set to “false” for production use.
//      */
//     acceptPartial?: boolean;
//     /**
//      * optional string Project to perform query. Default value is ‘DEFAULT’.
//      */
//     project?: string;
//   }
//
//   /** 字段元数据信息 */
//   export interface ColumnMeta {
//     isNullable: number;
//     displaySize: number;
//     label: string;
//     name: string;
//     schemaName: string;
//     catelogName: string;
//     tableName: string;
//     precision: number;
//     scale: number;
//     columnType: number;
//     columnTypeName: string;
//     readOnly: boolean;
//     autoIncrement: boolean;
//     caseSensitive: boolean;
//     currency: boolean;
//     definitelyWritable: boolean;
//     searchable: boolean;
//     signed: boolean;
//     writable: boolean;
//   }
//
//   /** 原始响应结果 */
//   export interface RawResult {
//     url: string;
//     exception: string;
//     columnMetas: ColumnMeta[];
//     results: string[][];
//     cube: string;
//     affectedRowCount: number;
//     isException: boolean;
//     exceptionMessage: string;
//     duration: number;
//     totalScanCount: number;
//     hitExceptionCache: boolean;
//     storageCacheUsed: boolean;
//     partial: boolean;
//   }
//
//   /** 包装响应结果 */
//   export interface WrapperResult {
//     /**
//      * 是否成功
//      */
//     success: boolean;
//     /**
//      * 错误信息
//      */
//     message: string;
//     /**
//      * 字段名称
//      */
//     columnNames?: string[];
//     /**
//      * 字段值
//      */
//     columnValues?: string[][];
//   }
//
//   /** 客户端响应结果 */
//   export type Result = RawResult | WrapperResult;
//
//   /**
//    * 客户端全局配置
//    * @param kylinConfig 客户端默认配置参数
//    */
//   export function config(kylinConfig?: KylinConfig): void;
//
//   /**
//    * 异步返回
//    * @param options
//    * @param kylinConfig 可选参数，默认使用全局配置
//    */
//   export function query(options: QueryOptions, kylinConfig?: KylinConfig): Promise<Result>;
// }
