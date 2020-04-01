import os from 'os';

export interface IOptions {
  /**
   * @description 基本目录
   * @default process.cwd()
   */
  baseDir?: string;
  /**
   * @description tsconfig.json 配置文件
   * @default tsconfig.json
   */
  tsConfig?: string;
  /**
   * @description
   * @default false
   */
  removeComments?: boolean;
  /**
   * @description 模块前缀(默认使用项目名称或者自定义)
   * @default true
   */
  modulePrefix?: boolean | string;
  /**
   * @description 声明文件目录
   */
  outDir?: string;
  /**
   * @description 输出单个声明文件
   * @default false
   */
  outFile?: boolean | string;
  /**
   * @description exportEquals 导出功能
   * @default false
   */
  exportEquals?: boolean;
  /**
   * @description
   * @default false
   */
  noEmit?: boolean;
  include?: string[];
  /**
   * @description 排除文件 glob
   * @default
   */
  exclude?: string[];
  eol?: string;
  indent?: string;
  log?: (message: any, ...optionalParams: any[]) => void;
  verbose?: boolean;
}

export const DEFAULT_OPTS: IOptions = {
  baseDir: '.',
  tsConfig: 'tsconfig.json',
  outDir: undefined,
  outFile: false,
  exportEquals: false,
  noEmit: false,
  include: [],
  exclude: ['**/*.+(d|spec|test).ts'],
  eol: os.EOL,
  indent: '\t',
  verbose: false,
  removeComments: false,
  log: msg => {
    console.log(msg);
  },
};
