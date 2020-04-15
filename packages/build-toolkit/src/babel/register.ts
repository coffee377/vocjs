import BabelOptions from './BabelOptions';
import DefaultOptions from './DefaultOptions';

const register = (opts: BabelOptions = DefaultOptions) => {
  // eslint-disable-next-line global-require
  require('@babel/register')({
    extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.tsx', '.ts'],
    babelrc: false,
    cache: false,
    ...opts.toOptions(),
  });
};

export default register;
