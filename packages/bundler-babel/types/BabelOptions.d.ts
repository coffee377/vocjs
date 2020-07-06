import { TransformOptions } from '@babel/core';
import { ChainedMap } from '@vocjs/utils';
import Plugin from "./BabelPlugin";
import Preset from "./BabelPreset";
import { ModuleType } from "./options";
export interface IBabelConfig {
    isDev?: boolean;
    isReact?: boolean;
    isTS?: boolean;
    isAntd?: boolean;
    runtimeHelper?: boolean;
    modules?: ModuleType;
}
declare class BabelOptions extends ChainedMap {
    config: any;
    constructor(config?: any);
    tap<C = any>(configFn: (config: C) => C): this;
    /**
     * @description 创建插件
     * @param name
     */
    plugin(name: string): Plugin;
    /**
     * @description 创建预设
     * @param name
     */
    preset(name: string): Preset;
    /**
     * @description 是否显示注释
     * @param showComments
     */
    comments(showComments: boolean): this;
    /**
     * @description 是否压缩代码
     * @param minify
     */
    minified(minify?: boolean): this;
    toConfig(): TransformOptions;
    toString(space?: string | number | undefined): string;
}
export default BabelOptions;
