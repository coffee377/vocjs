import { join } from 'path';
import slash from 'slash';
import getBabelTransformConfig from './getBabelTransformConfig';

interface IRegisterBabelOpts {
  cwd: string;
  only: string[];
}

const registerBabel = (opts: IRegisterBabelOpts) => {
  const { cwd, only } = opts;
  const { opts: babelConfig } = getBabelTransformConfig({
    target: 'node',
    typescript: true,
    modules: 'esm',
  });
  // eslint-disable-next-line global-require
  require('@babel/register')({
    ...babelConfig,
    extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.tsx', '.ts'],
    only: only.map(file => slash(join(cwd, file))),
    babelrc: false,
    cache: false,
  });
};

export default registerBabel;
