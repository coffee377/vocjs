import DefaultOptions, { PluginName, PresetName } from './DefaultOptions';
import ObjectValue from './utils';
import { EnvOptions } from './options';
import { IBabelConfig } from './BabelOptions';

describe('babel options', () => {
  test('cjs & ts & react', () => {
    const opts = new DefaultOptions();
    opts.tap<IBabelConfig>(config => ({ ...config, isTS: true, modules: 'cjs', isReact: true }));

    expect(opts.toConfig()).toMatchSnapshot();
  });
});

test('ObjectValue', () => {
  const o = ObjectValue.of();
  o.add<string>('a', '1');
  o.add<string>('b', '2');
  o.remove('b');
  expect(o.toObject()).toEqual({ a: '1' });
});
