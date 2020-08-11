import BabelOptions from './config/BabelOptions';
import DefaultBabelOptions from './config/DefaultBabelOptions';

const register = (opts: BabelOptions = new DefaultBabelOptions()) => {
  // eslint-disable-next-line global-require
  require('@babel/register')({
    extensions: ['.tsx', '.ts', '.es6', '.es', '.jsx', '.js', '.mjs'],
    babelrc: false,
    cache: false,
    ...opts.toConfig(),
  });
};

export default register;
