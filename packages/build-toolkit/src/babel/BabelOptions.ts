import { TransformOptions } from '@babel/core';
import ChainedMap from '../chain/ChainedMap';
import Plugin from './BabelPlugin';
import Preset from './BabelPreset';
import ObjectValue from './utils';
import { ModuleType } from './options';

export interface IBabelConfig {
  isDev?: boolean;
  isReact?: boolean;
  isTS?: boolean;
  isAntd?: boolean;
  runtimeHelper?: boolean;
  modules?: ModuleType;
}
interface IHook {
  configChanged;
}

class BabelOptions extends ChainedMap {
  config: any;

  constructor(config: any = {}) {
    super('BabelOptions', config);
    this.config = config;
  }

  tap<C = any>(configFn: (config: C) => C): this {
    this.config = configFn(this.config);
    return this;
  }

  /**
   * @description 创建插件
   * @param name
   */
  plugin(name: string): Plugin {
    const plugins: ChainedMap<BabelOptions, Plugin> = this.getOrCompute(
      'plugins',
      () => new ChainedMap<BabelOptions, Plugin>('plugins', this),
    );
    const pluginNums: number = plugins.store.size || 0;
    return plugins.getOrCompute(name, () => new Plugin(name, this, pluginNums));
  }

  /**
   * @description 创建预设
   * @param name
   */
  preset(name: string): Preset {
    const presets: ChainedMap<BabelOptions, Preset> = this.getOrCompute(
      'presets',
      () => new ChainedMap<BabelOptions, Preset>('presets', this),
    );
    const presetNums: number = presets.store.size || 0;
    return presets.getOrCompute(name, () => new Preset(name, this, presetNums));
  }

  /**
   * @description 是否显示注释
   * @param showComments
   */
  comments(showComments: boolean): this {
    return this.set('comments', showComments);
  }

  /**
   * @description 是否压缩代码
   * @param minify
   */
  minified(minify?: boolean): this {
    return this.set('minified', minify);
  }

  toConfig(): TransformOptions {
    const result = ObjectValue.of();
    const entries = this.entries();
    Object.keys(entries).forEach(name => {
      let value: any = entries[name];
      if (name === 'presets') {
        value = (value as ChainedMap<string, Preset>)
          .values()
          .map(preset => preset.emit(this.config))
          .filter(preset => preset.isValid())
          .map(preset => preset.toPluginItem());
      } else if (name === 'plugins') {
        value = (value as ChainedMap<string, Plugin>)
          .values()
          .map(plugin => plugin.emit(this.config))
          .filter(plugin => plugin.isValid())
          .map(plugin => plugin.toPluginItem());
      }
      result.add(name, value);
    });
    return result.toObject();
  }

  toString(space: string | number | undefined = 2): string {
    return JSON.stringify(this.toConfig(), undefined, space);
  }
}

export default BabelOptions;
