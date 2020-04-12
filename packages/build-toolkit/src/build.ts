// import { merge } from 'lodash';
// // eslint-disable-next-line import/no-unresolved,import/named
// import { BundleTool, IBundleOptions, ICjs, IEsm, IUmd } from './types';
// import { getExistFile } from './utils';
// import getUserConfig, { CONFIG_FILES } from './getUserConfig';
// import { Babel, IBabelOptions } from './babel';
//
// import register from './babel/registerBabel';
//
// export const getBundleOpts = (opts: any): IBundleOptions[] => {
//   const { cwd, rootConfig = {}, buildArgs = {} } = opts;
//   const entry = getExistFile({
//     cwd,
//     files: ['src/index.tsx', 'src/index.ts', 'src/index.jsx', 'src/index.js'],
//     relative: true,
//   });
//   const userConfigs: IBundleOptions[] = getUserConfig(cwd);
//   return userConfigs.map(userConfig => {
//     const bundleOpts: IBundleOptions = merge(
//       {
//         entry,
//       },
//       rootConfig, // 根配置
//       userConfig, // 用户配置
//       buildArgs, // 构建参数
//     );
//
//     if (typeof bundleOpts.esm === 'string') {
//       bundleOpts.esm = { modules: bundleOpts.esm } as IEsm;
//     }
//     if (typeof bundleOpts.cjs === 'string') {
//       bundleOpts.cjs = { modules: bundleOpts.cjs } as ICjs;
//     }
//     if (typeof bundleOpts.umd === 'string') {
//       bundleOpts.umd = { modules: bundleOpts.umd } as IUmd;
//     }
//
//     return bundleOpts;
//   });
// };
//
// const validateBundleOpts = (bundleOpts: IBundleOptions, { cwd, rootPath }) => {};
//
// export const compile = async (tool: BundleTool, opts: IBabelOptions) => {
//   if (tool.match('babel')) {
//     const babel = new Babel(opts);
//     return babel.run();
//   }
//   return null;
//   // switch (tool) {
//   //   case 'webpack':
//   //     // await webpack(opts as IWebpackOpts);
//   //     break;
//   //   // case 'rollup':
//   //   //   await rollup(opts as IRollupOpts);
//   //   //   break;
//   //   case 'babel':
//   //   default:
//   //     // eslint-disable-next-line no-case-declarations
//   //     const babel = new Babel(opts);
//   //     return babel.run();
//   //   // await babel(opts as IBabelOpts);
//   // }
// };
//
// export const build = async (opts: any) => {
//   const { cwd, watch, rootPath } = opts;
//
//   // register babel for config files
//   register({
//     cwd,
//     only: CONFIG_FILES,
//   });
//
//   function log(msg) {
//     console.log(`${msg}`);
//   }
//
//   // Get config
//   const bundleOptsArray = getBundleOpts(opts);
//
//   bundleOptsArray.forEach(bundleOpts => {
//     validateBundleOpts(bundleOpts, { cwd, rootPath });
//
//     const { umd, cjs, esm } = bundleOpts;
//     // Build esm
//     if (esm) {
//       const { type } = esm;
//       const babelOpts: IBabelOptions = { cwd, target: 'node' };
//       compile(type || 'babel', babelOpts);
//     }
//
//     // // Build umd
//     // if (umd) {
//     //   const { minify } = umd;
//     // }
//     //
//     // // Build cjs
//     // if (cjs) {
//     //   const { type } = cjs;
//     //   const babelOpts: IBabelOpts = { cwd, target: 'node', bundleOpts, watch };
//     //   compile(type || 'babel', babelOpts);
//     // }
//   });
// };
//
// export default async function(opts: any) {
//   await build(opts);
// }
