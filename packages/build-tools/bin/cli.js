#! /usr/bin/env node
// require('../lib/client');

const babel = require('../lib/babel');

// vfs.src('', {}).pipe(vfs.dest('targetPath'));
const opts = {
  globs: ['src/*.ts','src/babel/**'],
  destFolder: 'dist',
  modules: 'esm',
  typescript: false,
  minified: false,
  // comments: false,
  srcOpts: {
    ignore: '/client/**',
  },
};
babel.compiler({});
