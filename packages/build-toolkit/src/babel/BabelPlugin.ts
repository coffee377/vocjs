import { PluginItem, PluginOptions, PluginTarget } from '@babel/core';
import { ChainedMap, Orderable } from '../chain';
import Options from './Options';

type Target = PluginTarget;

class BabelPlugin extends ChainedMap<Options, any> implements Orderable {
  private priority: number;

  private beforeName: string;

  private afterName: string;

  private target: Target;

  private options: PluginOptions;

  private merging: string;

  constructor(parent: Options, name: string, num: number = 0) {
    super(parent);
    this.name = name;
    this.priority = num;
  }

  after(name: string): this {
    if (this.beforeName) {
      throw new Error(`Unable to set .before(${JSON.stringify(name)}) with existing value for .after()`);
    }

    this.afterName = name;
    return this;
  }

  before(name: string): this {
    if (this.afterName) {
      throw new Error(`Unable to set .after(${JSON.stringify(name)}) with existing value for .before()`);
    }

    this.beforeName = name;
    return this;
  }

  order(index: number): this {
    this.priority = index;
    return this;
  }

  use(target: Target, options?: PluginOptions, merging?: string): this {
    this.target = target;
    this.options = options;
    this.merging = merging;
    return this;
  }

  useless(): this {
    this.target = undefined;
    this.options = undefined;
    return this;
  }

  tap(fn: (options: PluginOptions) => PluginOptions): this {
    this.options = fn(this.options);
    return this;
  }

  public isValid(): boolean {
    return this.target !== undefined;
  }

  isTarget() {
    return true;
  }

  toConfig(condition?: boolean): PluginItem {
    if (condition) {
      this.emit(condition);
    }
    if (this.isValid() && this.isTarget()) {
      if (this.merging) {
        return [this.target, this.options || {}, this.merging];
      }
      if (!this.merging && this.options && Object.keys(this.options).length > 0) {
        return [this.target, this.options];
      }

      return this.target;
    }
    return this.target;
  }
}

export default BabelPlugin;
