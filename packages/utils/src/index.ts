import { basename, dirname, extname, join } from 'path';
import slash from 'slash';

export * from './chain';

const withExtension = (filename: string, ext: string = '.js') => {
  const newBasename = basename(filename, extname(filename)) + ext;
  return slash(join(dirname(filename), newBasename));
};

export { withExtension };
