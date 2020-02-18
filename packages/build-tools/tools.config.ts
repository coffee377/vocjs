// eslint-disable-next-line import/no-unresolved
import { IBundleOptions } from './src/types';

const config: IBundleOptions = {
  entry: 'src/index.ts',
  esm: {
    type: 'babel',
    file: '',
    modules: 'esm',
    minify: false,
    removeComment: false,
  },
};

export default config;
