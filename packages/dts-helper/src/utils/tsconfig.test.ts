import path from 'path';
import { getConfig } from './tsconfig';
import { DEFAULT_OPTS } from '../options';

test('tsconfig file ', () => {
  const file = path.resolve(__dirname, '../../../kylin-client');
  console.log(getConfig(file, DEFAULT_OPTS));
});
