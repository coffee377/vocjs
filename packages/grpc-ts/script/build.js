#! /usr/bin/env node
const p = require.resolve('build-toolkit').replace('index.js', 'babel');

// eslint-disable-next-line import/no-dynamic-require
const { Babel } = require(p);

const babel = new Babel({ typescript: true, modules: 'cjs' });
babel.hooks.options.tap('comments', opts => {
  return { ...opts, comments: false, minified: false };
});

babel.run();
