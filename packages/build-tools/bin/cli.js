#! /usr/bin/env node
// const { extname } = require('path');
// const vfs = require('vinyl-fs');
// const through = require('through2');
//
// const createStream = (glob, srcPath, targetPath) => {
//   vfs
//     .src(glob, { base: srcPath, })
//     .pipe(
//       through.obj((file, enc, callback) => {
//         // file.contents = "1";
//         file.path = file.path.replace(extname(file.path), '.js');
//         callback(null, file);
//       }),
//     )
//     .pipe(vfs.dest(targetPath));
//   console.log('222');
// };
//
// createStream('src/index.ts', 'src', 'dist3');
function build() {
  // eslint-disable-next-line global-require
  const cmdOpts = {};
  require('../lib/build')
    .default(cmdOpts)
    .catch(e => {
      // signale.error(e);
      process.exit(1);
    });
}
build();
