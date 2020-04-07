#! /usr/bin/env node
// require('../lib/client');

const { Babel } = require('../lib/babel');

const babel = new Babel({ typescript: true, modules: 'cjs' });
babel.hooks.options.tap('comments', opts => {
  return { ...opts, comments: false, minified: true };
});

babel.run();
