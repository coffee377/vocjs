export interface TypeScriptOptions {
  /**
   * @description 强制启用jsx解析
   * @default false
   */
  isTSX?: boolean;

  /**
   * @description 替换编译JSX表达式时使用的函数
   * @default React
   */
  jsxPragma?: string;

  /**
   * @description 指示应将每个文件解析为TS或TSX（取决于isTSX选项）
   * @default false
   */
  allExtensions?: boolean;

  /**
   * @description 启用TypeScript名称空间的编译
   * @default false
   */
  allowNamespaces?: boolean;
}
