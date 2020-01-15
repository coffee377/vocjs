import { IBundleOptions } from 'father-build/src/types';

const lib: IBundleOptions = {
  // esm: {
  //   type: 'babel',
  //   importLibToEs: true,
  //   minify: true,
  // },
  cjs: {
    type: 'babel',
    minify: true,
  },
  // umd: {
  //   minFile: true,
  // },
};

// const ui: IBundleOptions = {};

export default lib;
