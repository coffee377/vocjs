import { join, resolveFileName } from './index';

describe('util test suite', () => {
  test('join', () => {
    expect(join('-', null, 'A', undefined, '', 'B')).toBe('A-B');
    expect(join('-', null, 'A', undefined, '', 'B', true)).toBe('A-B-true');
  });
});
