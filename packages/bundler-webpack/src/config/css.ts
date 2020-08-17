import { RuleSetCondition } from 'webpack';
import Config from 'webpack-chain';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { IOpts } from './index';

export type Test = RuleSetCondition | RuleSetCondition[];

export interface RuleConfig<Options = Record<string, any>> extends IOpts {
  name: string;
  test: Test;
  loader?: string;
  options?: Options;
}

/**
 * 添加样式规则
 * @param webpackConfig
 * @param ruleConfig
 * @param query
 * @param devMode
 */
const addCSSRule = (
  webpackConfig: Config,
  ruleConfig: RuleConfig,
  query: string = 'modules',
  devMode: boolean = false,
) => {
  const { name, test, loader, options, miniCSSExtractPluginLoaderPath } = ruleConfig;
  const baseRule = webpackConfig.module.rule(name).test(test);
  const reg: RegExp = new RegExp(query);
  const modulesRule = baseRule.oneOf('modules').resourceQuery(reg);
  const normalRule = baseRule.oneOf('normal');

  const applyLoaders = (rule: Config.Rule<Config.Rule>, cssModules: boolean) => {
    /* 1. 开发环境使用 style-loader ,生产环境使用 mini-css-extract-loader */
    rule.use('first-loader').when(
      devMode,
      (use) => {
        use
          .loader(require.resolve('style-loader'))
          .options({})
          .tap((preOptions) => ({ ...preOptions }));
      },
      (use) => {
        use
          .loader(miniCSSExtractPluginLoaderPath || require.resolve('mini-css-extract-plugin/dist/loader'))
          .options({})
          .tap((preOptions) => ({ ...preOptions }));
      },
    );

    /* 2. css-loader */
    rule
      .use('css-loader')
      .loader(require.resolve('css-loader'))
      .options({
        importLoaders: loader ? 2 : 1,
        modules: cssModules
          ? {
              // localIdentName: '[local]_[hash:base64:5]',
              localIdentName: '[local]--[hash:base64:5]',
              exportLocalsConvention: 'camelCase',
            }
          : false,
        url: false,
      })
      .tap((preOptions) => ({ ...preOptions }));

    /* 3. postcss-loader */
    rule
      .use('postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .options({
        plugins: (loader) => [
          require('postcss-import')({ root: loader.resourcePath }),
          require('postcss-preset-env')({
            autoprefixer: {
              grid: 'autoplace', // css grid 兼容IE浏览器
            },
          }),
          require('cssnano')({
            preset: ['default', {}],
          }),
          require('postcss-smart-asset')([
            {
              filter: '**/public/**/*',
              url: (asset) => `../${String(asset.url).replace(/public\//, '')}`,
            },
          ]),
        ],
      })
      .tap((preOptions) => ({ ...preOptions }));

    /* 4. less sass/scss stylus */
    if (loader) {
      rule.use(loader).loader(require.resolve(loader)).options(options);
    }
  };

  applyLoaders(modulesRule, true);
  applyLoaders(normalRule, false);
};

export { addCSSRule };
