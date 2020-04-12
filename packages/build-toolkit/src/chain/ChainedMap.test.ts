import ChainedMap from './ChainedMap';

test('is Chainable', () => {
  const parent = { parent: true };
  const map = new ChainedMap(parent);

  expect(map.end()).toBe(parent);
});

test('creates a Map', () => {
  const map = new ChainedMap();
  expect(map.store instanceof Map).toBeTruthy();
});

test('order', () => {
  const map = new ChainedMap('parent is string');
  map.extend(['name']);
  map.set('a', { d: true });
  map.set('b', { d: false, before: 'a' });
  const { entries, order } = map.order();
  expect(order).toEqual(['name', 'a', 'b']);
});
