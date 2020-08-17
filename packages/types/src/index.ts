import { DevTool } from 'webpack-chain';
import webpack, { Configuration, ExternalsElement } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export enum BundlerConfigType {
  csr = 'csr', // 客户端渲染
  ssr = 'ssr', // 服务端渲染
}

export type IBundlerConfigType = keyof typeof BundlerConfigType;

export type WithFalse<T> = {
  [P in keyof T]?: T[P] | false;
};

interface BaseIConfig {
  /**
   * @description webpack 别名配置
   */
  alias?: {
    [key: string]: string;
  };
  devtool?: DevTool;
  /**
   * @description 开发服务配置
   */
  devServer?: WebpackDevServer.Configuration;
  /**
   * @description limit can be specified via loader options and defaults to no limit.
   * @see https://www.npmjs.com/package/url-loader
   */
  inlineLimit?: boolean | number | string;
  /**
   * @description Prevent bundling of certain imported packages and instead retrieve these external dependencies at runtime.
   * @see https://webpack.js.org/configuration/externals/
   */
  externals?: webpack.ExternalsElement | webpack.ExternalsElement[];
  /**
   * @see https://www.webpackjs.com/plugins/define-plugin/
   */
  define?: {
    [key: string]: webpack.DefinePlugin.CodeValueObject;
  };
  /**
   * @description 生产环境是否使用 hash
   */
  hash?: boolean;
  /**
   * @description 输出目录
   * @default dist
   */
  outputPath?: string;
  /**
   * @description 发布基准路径
   */
  publicPath?: string;
  ssr?: any;
  [key: string]: any;
}

export type IConfig = WithFalse<BaseIConfig>;
