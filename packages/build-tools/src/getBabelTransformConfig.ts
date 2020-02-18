import { extname } from 'path';
import { TransformOptions } from '@babel/core';
// eslint-disable-next-line import/no-unresolved
import { ModulesType } from './types';

interface IGetBabelConfigOpts {
  target: 'browser' | 'node';
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

  const targets = isBrowser ? { browsers: ['last 2 versions', 'IE 10'] } : { node: nodeVersion || 8 };

  const type = modules.match(/cjs|umd/) ? modules : false;
  const transformOpts: TransformOptions = {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          targets,
          modules: type,
        },
      ],
    ],
    plugins: [],
    minified: minified || false,
    comments: comments || true,
  };

  /* presets */
  if (isBrowser) transformOpts.presets.push([require.resolve('@babel/preset-react')]);
  if (typescript) transformOpts.presets.push([require.resolve('@babel/preset-typescript')]);

  /* plugins */
  switch (modules) {
    case 'cjs':
      if (!isBrowser) {
        transformOpts.plugins.push([
          require.resolve('@babel/plugin-transform-modules-commonjs'),
          {
            lazy,
          },
        ]);
      }
      break;
    case 'umd':
      transformOpts.plugins.push([require.resolve('@babel/plugin-transform-modules-umd')]);
      break;
    case 'esm':
    default:
  }
  transformOpts.plugins.push([require.resolve('@babel/plugin-syntax-dynamic-import')]);
  transformOpts.plugins.push([require.resolve('@babel/plugin-proposal-export-default-from')]);
  transformOpts.plugins.push([require.resolve('@babel/plugin-proposal-export-namespace-from')]);
  transformOpts.plugins.push([require.resolve('@babel/plugin-proposal-do-expressions')]);
  transformOpts.plugins.push([require.resolve('@babel/plugin-proposal-nullish-coalescing-operator')]);
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
