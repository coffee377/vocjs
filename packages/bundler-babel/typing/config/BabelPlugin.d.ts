import { PluginItem, PluginOptions, PluginTarget } from '@babel/core';
import { ChainedMap, Orderable } from '@vocjs/utils';
import BabelOptions from './BabelOptions';
declare type OptionsFn<O = PluginOptions, C = any> = (options: O, config: C) => O;
declare class BabelPlugin extends ChainedMap<BabelOptions> implements Orderable {
    config: any;
    private priority;
    private beforeName;
    private afterName;
    private pluginTarget;
    private pluginOptions;
    private readonly pluginOptionsFnSet;
    private mergingName;
    constructor(name: string, parent: BabelOptions, priority: number);
    after(name: string): this;
    before(name: string): this;
    order(index: number): this;
    use(target: PluginTarget): this;
    options<Options = PluginOptions>(options?: Options): this;
    merging(name?: string): this;
    tap<Options = PluginOptions, Config = any>(optionsFn: OptionsFn<Options, Config>): this;
    isValid(): boolean;
    isTarget(): boolean;
    emit<Config = any>(config?: Config): this;
    toPluginItem<Config = any>(config?: Config): PluginItem;
}
export default BabelPlugin;
