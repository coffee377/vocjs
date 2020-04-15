import BabelOptions, { IBabelConfig } from './BabelOptions';
import { EnvOptions, ModuleType, ReactOptions, TypeScriptOptions } from './options';
import ObjectValue from './utils';

const opts = new BabelOptions();

const { isReact, isTS, isAntd, runtimeHelper } = opts.config;

enum PresetName {
  ENV = 'env',
  REACT = 'react',
  TYPE_SCRIPT = 'typescript',
}

opts
  .preset(PresetName.ENV)
  .order(1)
  .use('@babel/preset-env')
  .options()
  .tap<EnvOptions, IBabelConfig>((options, config) => {
    return ObjectValue.of(options)
      .add<string>('useBuiltIns', 'usage')
      .add<number>('corejs', 3)
      .add<ModuleType>('modules', config.modules)
      .toObject();
  })
  .end();

opts
  .preset(PresetName.REACT)
  .order(2)
  .when(isReact, truthy =>
    truthy.use('@babel/preset-react').tap<ReactOptions, IBabelConfig>((options, config) => {
      return ObjectValue.of(options)
        .add<boolean>('development', config.isDev)
        .toObject();
    }),
  )
  .end();

opts
  .preset(PresetName.TYPE_SCRIPT)
  .order(3)
  .when(isTS, truthy => {
    truthy.use('@babel/preset-typescript').tap<TypeScriptOptions, IBabelConfig>((options, config) => {
      const { isTS, isReact } = config;
      return ObjectValue.of(options)
        .add<boolean>('isTSX', isTS && isReact)
        .add<boolean>('allExtensions', isTS && isReact)
        .add<boolean>('allowNamespaces', true)
        .toObject();
    });
  })
  .end();

enum PluginName {
  PROPOSAL_EXPORT_DEFAULT_FROM = 'proposal-export-default-from',
  PROPOSAL_EXPORT_NAMESPACE_FROM = 'proposal-export-namespace-from',
  PROPOSAL_DO_EXPRESSIONS = 'proposal-do-expressions',
  PROPOSAL_OPTIONAL_CHAINING = 'proposal-optional-chaining',
  PROPOSAL_DECORATORS = 'proposal-decorators',
  PROPOSAL_CLASS_PROPERTIES = 'proposal-class-properties',
  TRANSFORM_RUNTIME = 'transform-runtime',
  IMPORT = 'import',
}

opts
  .plugin(PluginName.PROPOSAL_EXPORT_DEFAULT_FROM)
  .order(2)
  .use('@babel/plugin-proposal-export-default-from');
opts
  .plugin(PluginName.PROPOSAL_EXPORT_NAMESPACE_FROM)
  .order(3)
  .use('@babel/plugin-proposal-export-namespace-from');
opts
  .plugin(PluginName.PROPOSAL_DO_EXPRESSIONS)
  .order(4)
  .use('@babel/plugin-proposal-do-expressions');
opts
  .plugin(PluginName.PROPOSAL_OPTIONAL_CHAINING)
  .order(5)
  .use('@babel/plugin-proposal-optional-chaining');
opts
  .plugin(PluginName.PROPOSAL_DECORATORS)
  .order(6)
  .use('@babel/plugin-proposal-decorators')
  .options({ legacy: true });
opts
  .plugin(PluginName.PROPOSAL_CLASS_PROPERTIES)
  .order(7)
  .use('@babel/plugin-proposal-class-properties')
  .options({ loose: true });
opts
  .plugin(PluginName.TRANSFORM_RUNTIME)
  .order(8)
  .when(runtimeHelper, truthy => truthy.use('@babel/plugin-transform-runtime'));
opts
  .plugin(PluginName.IMPORT)
  .order(9)
  .when(isAntd, truthy => truthy.use('babel-plugin-import'))
  .options({
    libraryName: 'antd',
    libraryDirectory: 'lib',
    style: true,
  });

export { PresetName, PluginName };

export default opts;
