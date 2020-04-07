import { withExtension } from '../src/utils';

test('withExtension', () => {
  expect(withExtension("src/index.ts")).toBe('src/index.js')
});
