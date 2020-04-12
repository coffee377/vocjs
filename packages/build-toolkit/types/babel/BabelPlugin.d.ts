import { PluginItem, PluginOptions, PluginTarget } from '@babel/core';
import { ChainedMap, Orderable } from "../chain";
import Options from "./Options";
declare type Target = PluginTarget;
declare class BabelPlugin extends ChainedMap<Options, any> implements Orderable {
    private priority;
    private beforeName;
    private afterName;
    private target;
    private options;
    private merging;
    constructor(parent: Options, name: string, num?: number);
    after(name: string): this;
    before(name: string): this;
    order(index: number): this;
    use(target: Target, options?: PluginOptions, merging?: string): this;
    useless(): this;
    tap(fn: (options: PluginOptions) => PluginOptions): this;
    isValid(): boolean;
    isTarget(): boolean;
    toConfig(condition?: boolean): PluginItem;
}
export default BabelPlugin;
