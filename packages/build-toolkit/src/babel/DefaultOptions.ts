import BabelOptions, { IBabelConfig } from './BabelOptions';
import { EnvOptions, ModuleType, ReactOptions, TypeScriptOptions } from './options';
import ObjectValue from './utils';

enum PresetName {
  ENV = 'env',
  REACT = 'react',
  TYPE_SCRIPT = 'typescript',
}

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

export { PresetName, PluginName };

class DefaultOptions extends BabelOptions {
  constructor() {
    super();
    this.initPreset();
    this.initPlugins();
  }

  initPreset() {
    this.preset(PresetName.ENV)
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

    this.preset(PresetName.REACT)
      .order(2)
      .condition<IBabelConfig>(config => {
        return config.isReact;
      })
      .truthy(handler => {
        handler.use('@babel/preset-react');
      })
      .tap<ReactOptions, IBabelConfig>((options, config) => {
        return { ...options, development: config.isDev };
      })
      .end();

    this.preset(PresetName.TYPE_SCRIPT)
      .order(3)
      .condition<IBabelConfig>(config => {
        return config.isTS;
      })
      .truthy(handler => {
        handler.use('@babel/preset-typescript');
      })
      .tap<TypeScriptOptions, IBabelConfig>((options, config) => {
        const { isTS, isReact } = config;
        let isTSX: boolean;
        if (isTS !== undefined && isReact !== undefined) {
          isTSX = isTS && isReact;
        }
        return { ...options, isTSX, allExtensions: isTSX, allowNamespaces: true };
      })
      .end();
  }

  initPlugins() {
    this.plugin(PluginName.PROPOSAL_EXPORT_DEFAULT_FROM)
      .order(2)
      .use('@babel/plugin-proposal-export-default-from');
    this.plugin(PluginName.PROPOSAL_EXPORT_NAMESPACE_FROM)
      .order(3)
      .use('@babel/plugin-proposal-export-namespace-from');
    this.plugin(PluginName.PROPOSAL_DO_EXPRESSIONS)
      .order(4)
      .use('@babel/plugin-proposal-do-expressions');
    this.plugin(PluginName.PROPOSAL_OPTIONAL_CHAINING)
      .order(5)
      .use('@babel/plugin-proposal-optional-chaining');
    this.plugin(PluginName.PROPOSAL_DECORATORS)
      .order(6)
      .use('@babel/plugin-proposal-decorators')
      .options({ legacy: true });
    this.plugin(PluginName.PROPOSAL_CLASS_PROPERTIES)
      .order(7)
      .use('@babel/plugin-proposal-class-properties')
      .options({ loose: true });
    this.plugin(PluginName.TRANSFORM_RUNTIME)
      .order(8)
      .condition<IBabelConfig>(config => {
        return config.runtimeHelper;
      })
      .truthy(handler => {
        handler.use('@babel/plugin-transform-runtime');
      });

    this.plugin(PluginName.IMPORT)
      .order(9)
      .condition<IBabelConfig>(config => config.isAntd)
      .truthy(fn => {
        fn.use('babel-plugin-import');
      })
      .options({
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      });
  }
}

export default DefaultOptions;
