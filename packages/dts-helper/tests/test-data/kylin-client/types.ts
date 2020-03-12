/** 客户端配置 */
export interface KylinConfig {
  /**
   * @description 是否 https 服务
   * @default false
   */
  https?: boolean;

  /**
   * @description 主机名或 IP
   * @default localhost
   */
  host?: string;

  /**
   * @description 端口号
   * @default 7070
   */
  port?: number;

  /**
   * @description 查询 api 路径地址
   * @default /kylin/api/query
   */
  queryApiPath?: string;

  /**
   * @description 用户名
   * @default ADMIN
   */
  username?: string;

  /**
   * @description 密码
   * @default KYLIN
   */
  password?: string;

  /**
   * @description 是否响应原始数据
   * @default false
   */
  rawData?: boolean;
}

/** 查询配置 */
export interface QueryOptions {
  /**
   * required string The text of sql statement.
   */
  sql: string;
  /**
   * optional int Query offset. If offset is set in sql, curIndex will be ignored.
   */
  offset?: number;
  /**
   * optional int Query limit. If limit is set in sql, perPage will be ignored.
   */
  limit?: number;
  /**
   * optional bool Whether accept a partial result or not, default be “false”. Set to “false” for production use.
   */
  acceptPartial?: boolean;
  /**
   * optional string Project to perform query. Default value is ‘DEFAULT’.
   */
  project?: string;
}

/** 字段元数据信息 */
export interface ColumnMeta {
  isNullable: number;
  displaySize: number;
  label: string;
  name: string;
  schemaName: string;
  catelogName: string;
  tableName: string;
  precision: number;
  scale: number;
  columnType: number;
  columnTypeName: string;
  readOnly: boolean;
  autoIncrement: boolean;
  caseSensitive: boolean;
  currency: boolean;
  definitelyWritable: boolean;
  searchable: boolean;
  signed: boolean;
  writable: boolean;
}

/** 原始响应结果 */
export interface RawResult {
  url: string;
  exception: string;
  columnMetas: ColumnMeta[];
  results: string[][];
  cube: string;
  affectedRowCount: number;
  isException: boolean;
  exceptionMessage: string;
  duration: number;
  totalScanCount: number;
  hitExceptionCache: boolean;
  storageCacheUsed: boolean;
  partial: boolean;
}

/** 包装响应结果 */
export interface WrapperResult {
  /**
   * 是否成功
   */
  success: boolean;
  /**
   * 错误信息
   */
  message: string;
  /**
   * 字段名称
   */
  columnNames?: string[];
  /**
   * 字段值
   */
  columnValues?: string[][];
}

/** 客户端响应结果 */
export type Result = RawResult | WrapperResult;
