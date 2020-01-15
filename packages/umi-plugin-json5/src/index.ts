// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from 'umi-types';

export interface Json5Options {
  [name: string]: any;
}

const Json5 = (api: IApi, opts: Json5Options) => {
  // 监听插件配置变化
  api.onOptionChange(newOpts => {
    opts = newOpts;
    api.rebuildTmpFiles();
  });

  let urlLoaderExcludes = api.config.urlLoaderExcludes;
  if (urlLoaderExcludes) {
    urlLoaderExcludes.push(/\.json5$/);
  } else {
    urlLoaderExcludes = [/\.json5$/];
  }
  api.config.urlLoaderExcludes = urlLoaderExcludes;

  api.chainWebpackConfig(config => {
    /* 添加 json5-loader */
    config.module
      .rule('json5')
      .test(/\.json5$/)
      .use('json5-loader')
      .loader(require.resolve('json5-loader') as string)
      .options(opts)
      .end();
  });
};

export default Json5;
