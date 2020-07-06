import webpack, { Configuration } from 'webpack';
import Config from 'webpack-chain';
import { join } from 'path';
import { IConfig, IBundlerConfigType, BundlerConfigType } from '@vocjs/types';
import WebpackBar from 'webpackbar';
import CopyPlugin from 'copy-webpack-plugin';
import resolveDefine from '../resolveDefine';

export interface IOpts {
  cwd: string;
  config: IConfig;
  type: IBundlerConfigType;
  env: 'development' | 'production';
  entry?: {
    [key: string]: string;
  };
  hot?: boolean;
  port?: number;
  babelOpts?: object;
  babelOptsForDep?: object;
  targets?: any;
  browserslist?: any;
  bundleImplementor?: typeof webpack;
  modifyBabelOpts?: (opts: object) => Promise<any>;
  modifyBabelPresetOpts?: (opts: object) => Promise<any>;
  chainWebpack?: (webpackConfig: any, args: any) => Promise<any>;
  miniCSSExtractPluginPath?: string;
  miniCSSExtractPluginLoaderPath?: string;
}

type ConfigFn = (opts: IOpts) => Promise<Configuration>;

const getConfig: ConfigFn = async (opts) => {
  const {
    cwd,
    config,
    type,
    env,
    entry,
    hot,
    port,
    bundleImplementor = webpack,
    modifyBabelOpts,
    modifyBabelPresetOpts,
    miniCSSExtractPluginPath,
    miniCSSExtractPluginLoaderPath,
  } = opts;
  const webpackConfig = new Config();
  /* 1. 配置环境 */
  webpackConfig.mode(env);

  const isWebpack5 = bundleImplementor.version!.startsWith('5');
  const isDev = env === 'development';
  const isProd = env === 'production';
  const disableCompress = process.env.COMPRESS === 'none';

  /* 入口配置 */
  if (entry) {
    Object.keys(entry).forEach((key) => {
      const e = webpackConfig.entry(key);
      // 提供打包好的版本，不消耗 webpack 编译时间
      // if (hot && isDev) {
      //   e.add(require.resolve('../webpackHotDevClient/webpackHotDevClient'));
      // }
      // if (config.runtimePublicPath) {
      //   e.add(require.resolve('./runtimePublicPathEntry'));
      // }
      e.add(entry[key]);
    });
  }

  /* devtool */
  const { devtool } = config;
  webpackConfig.devtool(isDev ? devtool || 'cheap-module-source-map' : devtool);

  /* devServer */
  // webpackConfig.devServer
  // webpackConfig.devServer.

  /* 输出配置 */
  const useHash = config.hash && isProd;
  const absOutputPath = join(cwd, config.outputPath || 'dist');
  webpackConfig.output
    .path(absOutputPath)
    .filename(useHash ? `[name].[contenthash:8].js` : `[name].js`)
    .chunkFilename(useHash ? `[name].[contenthash:8].async.js` : `[name].js`)
    .publicPath((config.publicPath! as unknown) as string)
    // remove this after webpack@5
    // free memory of assets after emitting
    .futureEmitAssets(true)
    .pathinfo(isDev || disableCompress);

  /* resolve */
  webpackConfig.resolve
    .set('symlinks', true)
    .modules.add('node_modules')
    .add(join(__dirname, '../../node_modules'))
    .end()
    .extensions.merge([
      '.web.js',
      '.wasm',
      '.mjs',
      '.js',
      '.web.jsx',
      '.jsx',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.json',
    ]);

  /* resolve.alias */
  if (config.alias) {
    Object.keys(config.alias).forEach((key) => {
      webpackConfig.resolve.alias.set(key, config.alias![key]);
    });
  }

  /* externals */
  if (config.externals) {
    webpackConfig.externals(config.externals);
  }

  // node shims
  // webpackConfig.node.merge({
  //   setImmediate: false,
  //   module: 'empty',
  //   dns: 'mock',
  //   http2: 'empty',
  //   process: 'mock',
  //   dgram: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty',
  //   child_process: 'empty',
  // });

  // todo
  const babelOpts = {};

  /* 脚本文件处理 */
  webpackConfig.module
    .rule('js')
    .test(/\.(js|mjs|jsx|ts|tsx)$/)
    .include.add(cwd)
    .end()
    .exclude.add(/node_modules/)
    .end()
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options(babelOpts);

  // webpackConfig.module
  //   .rule('ts-in-node_modules')
  //   .test(/\.(jsx|ts|tsx)$/)
  //   .include.add(/node_modules/)
  //   .end()
  //   .use('babel-loader')
  //   .loader(require.resolve('babel-loader'))
  //   .options(babelOpts);

  // const rule = webpackConfig.module.rule('js-in-node_modules').test(/\.(js|mjs)$/);

  webpackConfig.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options({
      limit: config.inlineLimit || 10000,
      name: 'static/[name].[hash:8].[ext]',
      // require 图片的时候不用加 .default
      esModule: false,
      fallback: {
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/[name].[hash:8].[ext]',
          esModule: false,
        },
      },
    });

  webpackConfig.module
    .rule('svg')
    .test(/\.(svg)(\?.*)?$/)
    .use('file-loader')
    .loader(require.resolve('file-loader'))
    .options({
      name: 'static/[name].[hash:8].[ext]',
      esModule: false,
    });

  webpackConfig.module
    .rule('fonts')
    .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
    .use('file-loader')
    .loader(require.resolve('file-loader'))
    .options({
      name: 'static/[name].[hash:8].[ext]',
      esModule: false,
    });

  webpackConfig.module
    .rule('plaintext')
    .test(/\.(txt|text|md)$/)
    .use('raw-loader')
    .loader(require.resolve('raw-loader'));

  /* plugins */

  /* define plugin */
  webpackConfig.plugin('define').use(bundleImplementor.DefinePlugin, [resolveDefine(config.define || {})]);

  // progress plugin
  if (!isWebpack5 && process.env.PROGRESS !== 'none') {
    webpackConfig
      .plugin('progress')
      .use(WebpackBar, [config.ssr ? { name: type === BundlerConfigType.ssr ? 'Server' : 'Client' } : {}]);
  }

  /* copy plugin */
  webpackConfig.plugin('copy').use(CopyPlugin, [
    { patterns: [{ from: 'public', to: absOutputPath }], options: {} },
    // [
    //   existsSync(join(cwd, 'public')) && {
    //     from: join(cwd, 'public'),
    //     to: absOutputPath,
    //   },
    //   ...(config.copy
    //     ? config.copy.map((from) => ({
    //         from: join(cwd, from),
    //         to: absOutputPath,
    //       }))
    //     : []),
    // ].filter(Boolean),
  ]);

  // error handler
  // if (process.env.FRIENDLY_ERROR !== 'none') {
  //   webpackConfig
  //     .plugin('friendly-error')
  //     .use(require.resolve('friendly-errors-webpack-plugin'), [
  //       {
  //         clearConsole: false,
  //       },
  //     ]);
  // }

  return webpackConfig.toConfig();
};

export default getConfig;
