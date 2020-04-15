import BabelOptions, { PluginName, PresetName } from './DefaultOptions';
import ObjectValue from './utils';
import { EnvOptions } from './options';
import { IBabelConfig } from './BabelOptions';

test('babel options', () => {
  const opts = BabelOptions;

  opts.tap<IBabelConfig>(config => {
    return { ...config, isReact: true, isDev: true, isTS: true, modules: 'cjs', isAntd: true, runtimeHelper: false };
  });

  // opts.preset(PresetName.TYPE_SCRIPT).order(-1);
  // opts.minified(null);
  // opts.comments(undefined);

  // opts.preset(PresetName.ENV).tap<EnvOptions>((options, config) => ({ ...options, modules: 'umd' }));
  opts.plugin(PluginName.IMPORT).tap((options, config) => ({ ...options, style: 'css' }));
  console.log(opts.toString());
});

test('ObjectValue', () => {
  const o = ObjectValue.of();
  o.add<string>('a', '1');
  o.add<string>('b', '2');
  o.remove('b');
  o.toObject();
});
