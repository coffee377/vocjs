import { IBundleOptions } from 'father-build/src/types';

const lib: IBundleOptions = {
  target: 'node',
  cjs: {
    type: 'babel',
    lazy: true,
    minify: true,
  },
};

export default lib;
