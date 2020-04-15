import { PluginItem, PluginOptions, PluginTarget } from '@babel/core';
import { ChainedMap, Orderable } from '../chain';
import BabelOptions from './BabelOptions';
import ChainedSet from '../chain/ChainedSet';

/**
 * 选项函数
 */
type OptionsFn<O = object, C = any> = (options: O, config: C) => O;

/**
 * 条件函数
 */
type ConditionFn<C = any> = (name: string, config: C) => boolean | undefined;

class BabelPlugin extends ChainedMap<BabelOptions> implements Orderable {
  config: any;

  /**
   * @description 优先级，数组越小优先级越高
   */
  private priority: number;

  private beforeName: string;

  private afterName: string;

  /**
   * @description 插件目标对象
   */
  private pluginTarget: PluginTarget;

  /**
   * @description 插件配置
   */
  private pluginOptions: PluginOptions;

  protected readonly pluginOptionsFnSet: ChainedSet<BabelPlugin, OptionsFn>;

  private conditionFn: ConditionFn;

  /**
   * @description 插件合并项
   */
  private mergingName: string;

  constructor(name: string, parent: BabelOptions, priority: number) {
    super(name, parent);
    this.priority = priority;
    this.pluginOptionsFnSet = new ChainedSet<BabelPlugin, OptionsFn>('pluginOptionsFnSet', this);
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

  /**
   * 插件目标
   * @param target
   */
  use(target: PluginTarget): this {
    this.pluginTarget = target;
    return this;
  }

  /**
   * 插件配置参数
   * @param options
   */
  options<Options = PluginOptions>(options?: Options): this {
    this.pluginOptions = options;
    return this;
  }

  merging(name?: string): this {
    this.mergingName = name;
    return this;
  }

  /**
   * @description 修改插件参数
   * @param optionsFn
   */
  tap<Options = PluginOptions, Config = any>(optionsFn: OptionsFn<Options, Config>): this {
    this.pluginOptionsFnSet.add(optionsFn);
    return this;
  }

  public isValid(): boolean {
    return this.pluginTarget !== undefined;
  }

  isTarget() {
    return true;
  }

  emit<Config = any>(conditionFn?: ConditionFn<Config>, config?: Config): this {
    if (config) {
      this.config = config;
    }
    if (conditionFn) {
      this.conditionFn = conditionFn;
    }
    if (this.conditionFn) {
      this.condition = this.conditionFn(this.name, this.config || {});
    }
    if (this.pluginOptionsFnSet) {
      this.pluginOptionsFnSet.values().forEach(fn => {
        this.pluginOptions = fn(this.pluginOptions, this.config);
      });
    }
    super.emit();
    return this;
  }

  toPluginItem(): PluginItem {
    this.emit();
    if (this.isValid() && this.isTarget()) {
      if (this.mergingName) {
        return [this.pluginTarget, this.pluginOptions || {}, this.mergingName];
      }
      if (!this.mergingName && this.pluginOptions && Object.keys(this.pluginOptions).length > 0) {
        return [this.pluginTarget, this.pluginOptions];
      }

      return this.pluginTarget;
    }
    return this.pluginTarget;
  }
}

export default BabelPlugin;
