export declare type ModuleType = 'amd' | 'umd' | 'systemjs' | 'commonjs' | 'cjs' | 'auto' | false;
export interface EnvOptions {
    /**
     * @description 描述您为项目支持/目标的环境
     * @default {}
     */
    targets?: string | Array<string> | {
        [name: string]: string;
    };
    /**
     * @description
     * @default false
     */
    spec?: boolean;
    /**
     * @description
     * @default false
     */
    loose?: boolean;
    /**
     * @description
     * @default false
     */
    debug?: boolean;
    /**
     * @description 启用将ES6模块语法转换为其他模块类型的功能
     * @default auto
     */
    modules?: ModuleType;
    /**
     * @description
     * @default []
     */
    include?: Array<string | RegExp>;
    /**
     * @description
     * @default []
     */
    exclude?: Array<string | RegExp>;
    /**
     * @description 配置如何处理polyfill
     * @default false
     */
    useBuiltIns?: 'usage' | 'entry' | false;
    /**
     * @description
     * @default 2
     */
    corejs?: 2 | 3 | {
        version: 2 | 3;
        proposals: boolean;
    };
    /**
     * @description
     * @default false
     */
    forceAllTransforms?: boolean;
    /**
     * @description 配置开始搜索浏览器列表的起点，然后升至系统根目录直到找到
     * @default process.cwd()
     */
    configPath?: string;
    /**
     * @description 切换是否使用 browserslist 配置源
     * @default false
     */
    ignoreBrowserslistConfig?: boolean;
    /**
     * @description 切换启用对浏览器附带的内置/功能建议的支持
     * @default false
     */
    shippedProposals?: boolean;
}
