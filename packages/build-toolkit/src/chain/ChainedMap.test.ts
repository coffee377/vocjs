import ChainedMap from './ChainedMap';

test('is Chainable', () => {
  const parent = { parent: true };
  const map = new ChainedMap('ChainedMap', parent);

  expect(map.end()).toBe(parent);
});

test('creates a Map', () => {
  const map = new ChainedMap();
  expect(map.store instanceof Map).toBeTruthy();
});

test('order', () => {
  const map = new ChainedMap('parent is string');
  map.set('a', { d: true });
  map.set('b', { d: false, beforeName: 'a' });
  const keys = map.keys();
  expect(keys).toEqual(['b', 'a']);
});

test('emit', () => {
  const map = new ChainedMap('emit');
  map.emit();
  const { config } = map;
  expect(config).toEqual({ A: true, B: true });
});
