import { IBundleOptions } from 'father-build/src/types';

const lib: IBundleOptions = {
  // esm: {
  //   type: 'babel',
  //   importLibToEs: true,
  //   minify: true,
  // },
  target: 'node',
  cjs: {
    type: 'babel',
    lazy: true,
    minify: true,
  },
  // umd: {
  //   minFile: true,
  // },
};

// const ui: IBundleOptions = {};

export default lib;
