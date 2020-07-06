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
  devServer?: WebpackDevServer.Configuration;
  /**
   * @description limit can be specified via loader options and defaults to no limit.
   * @see https://www.npmjs.com/package/url-loader
   */
  inlineLimit?: boolean | number | string;
  externals?: webpack.ExternalsElement | webpack.ExternalsElement[];
  /**
   * @see https://www.webpackjs.com/plugins/define-plugin/
   */
  define?: {
    [key: string]: webpack.DefinePlugin.CodeValueObject;
  };
  ssr?: any;
  hash?: boolean;
  outputPath?: string;
  publicPath?: string;
  [key: string]: any;
}

export type IConfig = WithFalse<BaseIConfig>;
