import Chained from './Chained';

test('Calling .end() returns parent', () => {
  const parent = { parent: true };
  const chain = new Chained(parent);

  expect(chain.end()).toBe(parent);
});

test('Using .batch() receives context', () => {
  const chain = new Chained<{ parent: boolean }>();
  const context = chain.batch(current => {
    expect(current).toBe(chain);
    current.parent = false;
  });

  expect(context).toBe(chain);
});
