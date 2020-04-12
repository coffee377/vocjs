#! /usr/bin/env node
const { Babel } = require('build-toolkit');

const babel = new Babel({ typescript: true, dest: 'lib' });
babel.hook.options.tap('comments', opts => {
  opts.preset('env').tap(options => ({
    ...options,
    modules: 'cjs',
  }));
  opts
    // .minified(true)
    .comments(false)
    .end();
  // return { ...opts, comments: false, minified: false };
});

babel.run().catch(err => {});
