import { PluginItem, TransformOptions } from '@babel/core';

/**
 * 打包工具
 */
export type BundleTool = 'babel' | 'webpack' | 'rollup';

/**
 * 模块类型
 */
export type ModulesType = 'cjs' | 'umd' | 'esm';

/**
 * 日志工具
 */
export type Logger = (message: string) => void;

/**
 * 打包输出配置
 */
interface IBundleOutput {
  /**
   * @description 打包类型
   * @default babel
   */
  type?: BundleTool;

  /**
   * @description 输出模块类型
   * @default esm
   */
  modules?: ModulesType;

  /**
   * @description 是否压缩
   * @default false
   */
  minify?: boolean;

  /**
   * @description 去除注释
   * @default false
   */
  removeComment?: boolean;
}

interface IEsm extends IBundleOutput {
  /**
   * @description 是否使用 mjs 扩展名
   * @default false
   */
  mjs?: boolean;

  importLibToEs?: boolean;
}

export interface ICjs extends IBundleOutput {
  lazy?: boolean;
}

interface IStringObject {
  [prop: string]: string;
}

interface IUmd extends IBundleOutput {
  globals?: IStringObject;
  name?: string;
  minFile?: boolean;
  // file?: string;
  sourcemap?: boolean;
}

/**
 * NODE API 编译参数
 */
export interface IBundleOptions {
  /**
   * @description 入口文件
   * @default index.[js|ts|jsx|tsx]
   */
  entry?: string | string[];
  file?: string;
  /**
   * @description esm
   * @default babel
   */
  esm?: BundleTool | IEsm | false;
  /**
   * @description cjs
   * @default false
   */
  cjs?: BundleTool | ICjs | false;
  /**
   * @description umd
   * @default false
   */
  umd?: BundleTool | IUmd | false;
  /**
   * @description babel 额外插件
   * @default []
   */
  extraBabelPlugins?: PluginItem[];
  /**
   * @description babel 额外预设
   * @default []
   */
  extraBabelPresets?: PluginItem[];
}

/**
 * 客户端命令行参数
 */
export interface IOpts {
  /**
   * @description 命令运行路径
   */
  cwd: string;
  /**
   * @description 监听文件变化
   * @default false
   */
  watch?: boolean;
  include?: string[];
  exclude?: string[];
  // /**
  //  * @description 配置文件
  //  */
  // bundleOpts: IBundleOptions;
  // /**
  //  * @description 命令行构建参数
  //  */
  // buildArgs?: IBundleOptions;
  /**
   * @description 根目录
   */
  // rootPath?: string;
  // rootConfig?: IBundleOptions;
}
