import { extname } from 'path';
import { TransformOptions } from '@babel/core';
import { ModulesType } from '../types/index.d';
// eslint-disable-next-line import/no-unresolved

interface IGetBabelConfigOpts {
  /**
   * @description 目标环境
   * @default node
   */
  target: 'browser' | 'node';

  /**
   * @description 模块类型
   */
  modules: ModulesType;

  typescript?: boolean;
  runtimeHelpers?: boolean;
  filePath?: string;
  minified?: boolean;
  comments?: boolean;
  browserFiles?: {
    [value: string]: any;
  };
  nodeVersion?: number;
  nodeFiles?: {
    [value: string]: any;
  };
  lazy?: boolean;
}

export default function(opts: IGetBabelConfigOpts): TransformOptions {
  const {
    target,
    typescript,
    modules,
    runtimeHelpers,
    filePath,
    minified,
    comments,
    browserFiles,
    nodeFiles,
    nodeVersion,
    lazy,
  } = opts;
  let isBrowser = target === 'browser';

  if (filePath) {
    if (extname(filePath).match(/[jt]sx$/)) {
      isBrowser = true;
    } else if (isBrowser) {
      if (nodeFiles.includes(filePath)) isBrowser = false;
    } else if (browserFiles.includes(filePath)) isBrowser = true;
  }

  const targets = isBrowser ? { browsers: ['last 2 versions', 'IE 10'] } : { node: nodeVersion || true || 8 };

  const type = modules.match(/cjs|umd/) ? modules : false;

  // todo 是否有必要暴露用户配置接口
  const presetEnvOpts = { useBuiltIns: 'usage', corejs: 3, targets, modules: type };

  const transformOpts: TransformOptions = {
    presets: [[require.resolve('@babel/preset-env'), presetEnvOpts]],
    plugins: [],
    minified: minified || false,
    comments: comments || true,
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
