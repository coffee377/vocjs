import { PluginItem, TransformOptions } from '@babel/core';
import { ModulesType } from "../types";
export interface IBabelConfigOpts {
    /**
     * @description 目标环境
     * @default node
     */
    target?: 'browser' | 'node';
    /**
     * @description 模块类型
     * @default esm
     */
    modules?: ModulesType;
    /**
     * @description 是否 TS
     * @default false
     */
    typescript?: boolean;
    /**
     * @description 运行时帮助
     */
    runtimeHelpers?: boolean;
    /**
     * @description 是否压缩代码
     * @default false
     */
    minified?: boolean;
    /**
     * @description 是否保留注释
     * @default true
     */
    comments?: boolean;
    nodeVersion?: number;
    filePath?: string;
    browserFiles?: {
        [value: string]: any;
    };
    nodeFiles?: {
        [value: string]: any;
    };
}
declare function getBabelTransformOptions(opts: IBabelConfigOpts): TransformOptions;
interface BabelConfig {
    /**
     * @description babel 插件
     * @default []
     */
    plugins?: PluginItem[];
    /**
     * @description babel 预设
     * @default []
     */
    presets?: PluginItem[];
}
declare const getBabelOptions: (opts: IBabelConfigOpts) => BabelConfig;
export { getBabelOptions, getBabelTransformOptions };
