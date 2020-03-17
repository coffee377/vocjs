import { join, resolveFileName, slash } from './index';
import path from 'path';

describe('util test suite', () => {
  test('join', () => {
    expect(join('-', null, 'A', undefined, '', 'B')).toBe('A-B');
    expect(join('-', null, 'A', undefined, '', 'B', true)).toBe('A-B-true');
  });

  test('resolveFileName', () => {
    expect(resolveFileName('src/test.ts')).toBe(path.resolve('src/test.ts'));
    expect(resolveFileName('src/test.ts', '')).toBe(path.resolve('src/test.ts'));
    expect(resolveFileName('src/test.ts', '.')).toBe(path.resolve('src/test.ts'));
    expect(resolveFileName('src/test.ts', 'D:/a/b')).toBe(path.resolve('D:/a/b', 'src/test.ts'));
    expect(resolveFileName('D:/a/b/src/test.ts', 'D:/a/b'));
    expect(slash(resolveFileName('D:/a/d/src/test.ts', 'D:/a/b'))).toBe('D:/a/d/src/test.ts');
  });
});
