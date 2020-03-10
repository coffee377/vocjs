export interface KylinConfig {
    https?: boolean;
    host?: string;
    port?: number;
    queryApiPath?: string;
    username?: string;
    password?: string;
    rawData?: boolean;
}
export interface QueryOptions {
    sql: string;
    offset?: number;
    limit?: number;
    acceptPartial?: boolean;
    project?: string;
}
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
export interface WrapperResult {
    success: boolean;
    message: string;
    columnNames?: string[];
    columnValues?: string[][];
}
export declare type Result = RawResult | WrapperResult;
