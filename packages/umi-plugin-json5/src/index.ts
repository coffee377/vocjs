// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from 'umi-types';
export interface Json5Options {
  [name: string]: any;
}

const JSON5Loader = (api: IApi, opts: Json5Options) => {

  // 监听插件配置变化
  api.onOptionChange(newOpts => {
    opts = newOpts;
    api.rebuildTmpFiles();
  });

  api.chainWebpackConfig(config => {
    const excludeRule = config.module.rule('exclude');
    excludeRule.exclude.add(/\.json5$/);

    /* 添加 json5-loader */
    config.module
      .rule('json5')
      .test(/\.json5$/)
      .use('json5-loader')
      .loader('json5-loader')
      .options(opts)
      .end();
  });
};

export default JSON5Loader;
