import { PluginItem, PluginOptions, PluginTarget } from '@babel/core';
import { ChainedMap, Orderable } from "../chain";
import BabelOptions from "./BabelOptions";
/**
 * 选项函数
 */
declare type OptionsFn<O = object, C = any> = (options: O, config: C) => O;
declare class BabelPlugin extends ChainedMap<BabelOptions> implements Orderable {
    config: any;
    /**
     * @description 优先级，数组越小优先级越高
     */
    private priority;
    private beforeName;
    private afterName;
    /**
     * @description 插件目标对象
     */
    private pluginTarget;
    /**
     * @description 插件配置
     */
    private pluginOptions;
    private readonly pluginOptionsFnSet;
    /**
     * @description 插件合并项
     */
    private mergingName;
    constructor(name: string, parent: BabelOptions, priority: number);
    after(name: string): this;
    before(name: string): this;
    order(index: number): this;
    /**
     * 插件目标
     * @param target
     */
    use(target: PluginTarget): this;
    /**
     * 插件配置参数
     * @param options
     */
    options<Options = PluginOptions>(options?: Options): this;
    merging(name?: string): this;
    /**
     * @description 修改插件参数
     * @param optionsFn
     */
    tap<Options = PluginOptions, Config = any>(optionsFn: OptionsFn<Options, Config>): this;
    isValid(): boolean;
    isTarget(): boolean;
    emit<Config = any>(config?: Config): this;
    toPluginItem<Config = any>(config?: Config): PluginItem;
}
export default BabelPlugin;
