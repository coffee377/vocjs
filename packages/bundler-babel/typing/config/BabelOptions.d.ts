import { TransformOptions } from '@babel/core';
import { ChainedMap } from '@vocjs/utils';
import { AutoCssModulesOptions } from '@vocjs/babel-plugin-auto-css-modules';
import Plugin from './BabelPlugin';
import Preset from './BabelPreset';
import { ModuleType } from './options';
export interface IBabelConfig {
    isDev?: boolean;
    isReact?: boolean;
    isTS?: boolean;
    isAntd?: boolean;
    runtimeHelper?: boolean;
    modules?: ModuleType;
    cssModules?: boolean | AutoCssModulesOptions;
    [key: string]: any;
}
declare class BabelOptions extends ChainedMap {
    config: any;
    constructor(config?: any);
    tap<C = any>(configFn: (config: C) => C): this;
    plugin(name: string): Plugin;
    preset(name: string): Preset;
    comments(showComments: boolean): this;
    minified(minify?: boolean): this;
    toConfig(): TransformOptions;
    toString(space?: string | number | undefined): string;
}
export default BabelOptions;
