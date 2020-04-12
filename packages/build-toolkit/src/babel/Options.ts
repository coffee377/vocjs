import { SyncWaterfallHook } from 'tapable';
import { TransformOptions } from '@babel/core';
import ChainedMap from '../chain/ChainedMap';
import Plugin from './BabelPlugin';
import Preset from './Preset';

export interface IConfig {
  react?: boolean;
  typescript?: boolean;
  antd?: boolean;
}

interface OptionsHooks {
  config: SyncWaterfallHook;
  // options: SyncHook<Options>;
}

class Options<T = any> extends ChainedMap<T, any> {
  hook: OptionsHooks;

  presets: ChainedMap<Options, Preset>;

  plugins: ChainedMap<Options, Plugin>;

  $comments: boolean = true;

  $minified: boolean = false;

  constructor(parent?: T) {
    super(parent);
    this.hook = Object.freeze({
      config: new SyncWaterfallHook(['config']),
      // options: new SyncHook<Options>(['options']),
    });
    this.presets = new ChainedMap(this);
    this.plugins = new ChainedMap(this);
    this.config = this.hook.config.call(this.config);
  }

  tap(fn: (config: T) => T) {
    this.config = fn(this.config);
    return this;
  }

  preset(name: string): Preset {
    const presetNums: number = this.presets.store.size || 0;
    return this.presets.getOrCompute(name, () => new Preset(this, name, presetNums));
  }

  plugin(name: string): Plugin {
    const pluginNums: number = this.plugins.store.size || 0;
    return this.plugins.getOrCompute(name, () => new Plugin(this, name, pluginNums));
  }

  comments(showComments: boolean): this {
    this.$comments = showComments;
    return this;
  }

  minified(minify: boolean): this {
    this.$minified = minify;
    return this;
  }

  toOptions(): TransformOptions {
    // this.hook.options.call(this);
    this.config = this.hook.config.call(this.config);
    return {
      presets: this.presets
        .values()
        .map(item => {
          return item.condition(name => {
            return name;
          }, this.config);
        })
        .filter(item => item.isValid())
        .map(item => item.toConfig()),
      plugins: this.plugins
        .values()
        .map(item => {
          return item.condition(name => {
            if (name === 'babel-plugin-import') {
              return 'antd';
            }
            return name;
          }, this.config);
        })
        .filter(item => item.isValid())
        .map(item => item.toConfig()),
      comments: this.$comments,
      minified: this.$minified,
    };
  }

  toString(space: string | number | undefined = 2): string {
    return JSON.stringify(this.toOptions(), undefined, space);
  }
}

export default Options;
