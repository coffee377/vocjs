import path from 'path';
import { DEFAULT_OPTS, IOptions } from '../src/options';
import { run } from '../src/declaration';
import { getConfig } from '../src/utils/tsconfig';
import { VisitorType } from '../src/declaration/transform';

test('dts', () => {
  const relative = 'D:\\fe\\grid-layout\\packages\\grid-layout-react';
  // const relative = '..';

  const root = path.resolve(relative, 'tsconfig.json');

  const opts: IOptions = {
    ...DEFAULT_OPTS,
    outDir: 'types',
    // outFile: 'index-test.d.ts',
    outFile: false,
    modulePrefix: true,
    exportEquals: false,
  };

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

test('kylin-client/index', () => {
  expect(VisitorType.BEFORE).toBe('before');
  expect(VisitorType.AFTER).toBe('after');
  expect(VisitorType.AFTER_DECLARATIONS).toBe('afterDeclarations');
});
