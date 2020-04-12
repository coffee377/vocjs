import { SyncWaterfallHook } from 'tapable';
import { TransformOptions } from '@babel/core';
import ChainedMap from "../chain/ChainedMap";
import Plugin from "./BabelPlugin";
import Preset from "./Preset";
export interface IConfig {
    react?: boolean;
    typescript?: boolean;
    antd?: boolean;
}
interface OptionsHooks {
    config: SyncWaterfallHook;
}
declare class Options<T = any> extends ChainedMap<T, any> {
    hook: OptionsHooks;
    presets: ChainedMap<Options, Preset>;
    plugins: ChainedMap<Options, Plugin>;
    $comments: boolean;
    $minified: boolean;
    constructor(parent?: T);
    tap(fn: (config: T) => T): this;
    preset(name: string): Preset;
    plugin(name: string): Plugin;
    comments(showComments: boolean): this;
    minified(minify: boolean): this;
    toOptions(): TransformOptions;
    toString(space?: string | number | undefined): string;
}
export default Options;
