import { PluginItem } from '@babel/core';
/**
 * 打包工具
 */
export declare type BundleTool = 'babel' | 'webpack';
/**
 * 模块类型
 */
export declare type ModulesType = 'esm' | 'cjs' | 'umd';
/**
 * 日志工具
 */
export declare type Logger = (message: string) => void;
/**
 * 打包输出配置
 */
interface IBundleOutput {
    /**
     * @description 输出目录
     */
    dest?: string;
    /**
     * @description 打包类型
     * @default babel
     */
    type?: BundleTool;
    /**
     * @description 输出模块类型
     * @default esm
     */
    modules?: ModulesType;
    /**
     * @description 是否压缩
     * @default false
     */
    minify?: boolean;
    /**
     * @description 去除注释
     * @default false
     */
    removeComment?: boolean;
}
export interface IEsm extends IBundleOutput {
    /**
     * @description 是否使用 mjs 扩展名
     * @default false
     */
    mjs?: boolean;
    importLibToEs?: boolean;
}
export interface ICjs extends IBundleOutput {
    lazy?: boolean;
}
interface IStringObject {
    [prop: string]: string;
}
export interface IUmd extends IBundleOutput {
    globals?: IStringObject;
    name?: string;
    sourcemap?: boolean;
}
/**
 * NODE API 编译参数
 */
export interface IBundleOptions {
    /**
     * @description 入口文件
     * @default index.[js|ts|jsx|tsx]
     */
    entry?: string | string[];
    /**
     * @description esm
     * @default babel
     */
    esm?: BundleTool | IEsm | false;
    /**
     * @description cjs
     * @default false
     */
    cjs?: BundleTool | ICjs | false;
    /**
     * @description umd
     * @default false
     */
    umd?: BundleTool | IUmd | false;
    /**
     * @description babel 额外插件
     * @default []
     */
    extraBabelPlugins?: PluginItem[];
    /**
     * @description babel 额外预设
     * @default []
     */
    extraBabelPresets?: PluginItem[];
}
export {};
