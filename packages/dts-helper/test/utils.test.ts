import { generate } from '../src/index';

test('dts gen', () => {
  // expect(slash('a\\b\\c')).toBe('a/b/c');
  generate({ outFile: false });
});
