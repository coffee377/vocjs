// #! /usr/bin/env node
// require('../lib/client');

// const { Babel } = require('../lib/babel');

// const babel = new Babel({ typescript: true, modules: 'cjs' });
// babel.hooks.options.tap('comments', opts => {
//   return { ...opts, comments: false, minified: true };
// });
//
// babel.run();
// const path = require('path');

require('@babel/register')({
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3, modules: 'cjs', targets: { node: true } }],
    ['@babel/preset-typescript', {}],
  ],
  plugins: [['@babel/plugin-proposal-class-properties', {}]],
  extensions: ['.ts'],
  configFile: false,
  cache: false,
  babelrc: false,
  // ignore: ['**/*/test.ts'],
  // ignore: [
  //   filepath => {
  //     console.log(filepath);
  //     return true;
  //   },
  // ],
  only: [/demo\.ts$/],
});

require('../src/test');
require('../src/demo');

// console.log(r);
