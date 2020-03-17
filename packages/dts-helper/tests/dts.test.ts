import path from 'path';
import { getConfig } from '../src/utils/tsconfig';
import { DEFAULT_OPTS, IOptions } from '../src/options';
import { emit } from '../src/declaration';

test('dts', () => {
  // const relative = '../../kylin-client';
  const relative = '..';

  const rooNames = path.resolve(__dirname, relative);

  const opts: IOptions = { ...DEFAULT_OPTS, outDir: 'types', outFile: true };

  emit(opts);
});
