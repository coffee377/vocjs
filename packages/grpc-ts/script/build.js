#! /usr/bin/env node
const { Babel } = require('build-toolkit');
const dts = require('dts-helper');

// esm
const esm = new Babel({ src: ['src/**', 'demo/**'], dest: 'es', isTS: true, modules: false });
esm.hook.options.tap('comments', opts => {
  opts.comments(false).end();
});

esm.run().catch(err => {
  console.log(err);
  process.exit(1);
});

// cjs
const cjs = new Babel({ src: ['src/**', 'demo/**'], dest: 'lib', isTS: true, modules: 'cjs' });
cjs.hook.options.tap('comments', opts => {
  opts.comments(false).end();
});

cjs.run().catch(err => {
  console.log(err);
  process.exit(1);
});

dts.emit({ outDir: 'types' }).catch(err => {
  console.log(err);
  process.exit(1);
});
