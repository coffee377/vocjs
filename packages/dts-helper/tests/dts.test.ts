import path from 'path';
import { DEFAULT_OPTS, IOptions } from '../src/options';
import { run } from '../src/declaration';
import { getConfig } from '../src/utils/tsconfig';

test('dts', () => {
  const relative = '../../kylin-client';
  // const relative = '..';

  const root = path.resolve(__dirname, relative, 'tsconfig.json');

  const opts: IOptions = { ...DEFAULT_OPTS, outDir: 'types-test', outFile: 'index-test.d.ts' };

  const tsconfig = getConfig(root, opts);

  run(tsconfig, opts);
});

test('kylin-client/index', () => {
  function r(name: string) {
    return name.replace(/\/?(\/|index)?$/, '');
  }
  expect(r('index/index')).toBe('index');
  expect(r('index')).toBe('');
  expect(r('a/index')).toBe('a');
  expect(r('a/')).toBe('a');
  expect(r('a')).toBe('a');
});
