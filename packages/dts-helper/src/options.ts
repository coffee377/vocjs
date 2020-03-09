export interface IOptions {
  /**
   * @description 基本目录
   * @default process.cwd()
   */
  baseDir: string;
  /**
   * @description tsconfig.json 配置文件
   * @default tsconfig.json
   */
  tsc: string;
  /**
   * @description 声明文件目录
   * @default types
   */
  outDir: string;
  /**
   * @description 输出单个声明文件
   * @default false
   */
  outFile: boolean | string;
  /**
   * @description
   * @default false
   */
  noEmit: boolean;
  /**
   * @description 排除文件 glob
   * @default
   */
  exclude: string[];
  main?: string;
  // project?: string;
  // files?: string[];
  //
  // externs?: string[];
  externals?: string[];
  types?: string[];
  eol?: string;
  indent?: string;

  // moduleResolution?: ts.ModuleResolutionKind;
  // name?: string;
  // out?: string;
  // prefix?: string;
  // rootDir?: string;
  // target?: ts.ScriptTarget;
  log?: (message: any, ...optionalParams: any[]) => void;
  // sendMessage?: (message: any, ...optionalParams: any[]) => void;
  // resolveModuleId?: (params: ResolveModuleIdParams) => string;
  // resolveModuleImport?: (params: ResolveModuleImportParams) => string;
  verbose?: boolean;
}
