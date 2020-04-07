import { extname } from 'path';
import { PluginItem, TransformOptions } from '@babel/core';
import { ModulesType } from '../types';

export interface IBabelConfigOpts {
  /**
   * @description 目标环境
   * @default node
   */
  target?: 'browser' | 'node';
  /**
   * @description 模块类型
   * @default esm
   */
  modules?: ModulesType;
  /**
   * @description 是否 TS
   * @default false
   */
  typescript?: boolean;
  /**
   * @description 运行时帮助
   */
  runtimeHelpers?: boolean;
  /**
   * @description 是否压缩代码
   * @default false
   */
  minified?: boolean;
  /**
   * @description 是否保留注释
   * @default true
   */
  comments?: boolean;
  nodeVersion?: number;
  filePath?: string;
  browserFiles?: {
    [value: string]: any;
  };
  nodeFiles?: {
    [value: string]: any;
  };
}

function getBabelTransformOptions(opts: IBabelConfigOpts): TransformOptions {
  const {
    target,
    typescript,
    modules,
    runtimeHelpers,
    minified,
    comments,
    filePath,
    browserFiles,
    nodeFiles,
    nodeVersion,
  } = opts;
  let isBrowser = target === 'browser';

  if (filePath) {
    if (extname(filePath).match(/\.[jt]sx?$/)) {
      isBrowser = true;
    } else if (isBrowser) {
      if (nodeFiles.includes(filePath)) isBrowser = false;
    } else if (browserFiles.includes(filePath)) isBrowser = true;
  }

  const targets = isBrowser ? { browsers: ['last 2 versions', 'IE 10'] } : { node: nodeVersion || true || 8 };

  const type = modules?.match(/cjs|umd/) ? modules : false;

  // todo 是否有必要暴露用户配置接口
  const presetEnvOpts = { useBuiltIns: 'usage', corejs: 3, modules: type, targets };

  const transformOpts: TransformOptions = {
    presets: [[require.resolve('@babel/preset-env'), presetEnvOpts]],
    plugins: [],
    minified: minified === undefined ? false : minified,
    comments: comments === undefined ? true : comments,
  };

  /* presets */
  if (isBrowser) transformOpts.presets.push([require.resolve('@babel/preset-react')]);
  if (typescript) transformOpts.presets.push([require.resolve('@babel/preset-typescript')]);

  /* plugins */
  transformOpts.plugins.push([require.resolve('@babel/plugin-proposal-export-default-from')]);
  transformOpts.plugins.push([require.resolve('@babel/plugin-proposal-export-namespace-from')]);
  transformOpts.plugins.push([require.resolve('@babel/plugin-proposal-do-expressions')]);
  transformOpts.plugins.push([require.resolve('@babel/plugin-proposal-optional-chaining')]);
  transformOpts.plugins.push([require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }]);
  transformOpts.plugins.push([require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }]);
  if (runtimeHelpers) {
    transformOpts.plugins.push([
      require.resolve('@babel/plugin-transform-runtime'),
      { useESModules: isBrowser && modules === 'esm' },
    ]);
  }

  return transformOpts;
}

interface BabelConfig {
  /**
   * @description babel 插件
   * @default []
   */
  plugins?: PluginItem[];
  /**
   * @description babel 预设
   * @default []
   */
  presets?: PluginItem[];
}

const getBabelOptions = (opts: IBabelConfigOpts): BabelConfig => {
  const { presets, plugins } = getBabelTransformOptions(opts);
  return { presets, plugins };
};

export { getBabelOptions, getBabelTransformOptions };
