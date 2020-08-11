require('@babel/register')({
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3, modules: 'cjs', targets: { node: true } }],
    ['@babel/preset-typescript', {}],
  ],
  plugins: [['@babel/plugin-proposal-class-properties', {}]],
  extensions: ['.js', '.ts'],
  cache: false,
  babelrc: false,
  // only: ['**/chain/*.ts'],
});

const dts = require('dts-helper');

// const cli = require('../src/cli/dir')
// //   .default({})
// //   .catch((err) => {
// //     console.error(err);
// //     process.exitCode = 1;
// //   });
//
// // esm
// // const esm = new BabelCompiler({ dest: 'esm', isTS: true, modules: false });
// // esm.hook.options.tap('opts', (opts) => {
// //   opts.minified(false).comments(false).end();
// // });
// // esm.run().then((s) => {});
// //
// // // cjs
// // const cjs = new BabelCompiler({ dest: 'lib', isTS: true, modules: 'cjs' });
// // cjs.hook.options.tap('opts', (opts) => {
// //   opts.minified(false).comments(false).end();
// // });
// // cjs.run().then((s) => {});
//
// // dts
// dts.emit({ outDir: 'typing' }).catch((err) => {
//   console.log(err);
//   process.exit(1);
// });
