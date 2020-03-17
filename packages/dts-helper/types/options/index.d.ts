export interface IOptions {
    /**
     * @description 基本目录
     * @default process.cwd()
     */
    baseDir?: string;
    /**
     * @description tsconfig.json 配置文件
     * @default tsconfig.json
     */
    tsConfig?: string;
    /**
     * @description
     * @default false
     */
    removeComments?: boolean;
    /**
     * @description 声明文件目录
     */
    outDir?: string;
    /**
     * @description 输出单个声明文件
     * @default false
     */
    outFile?: boolean | string;
    /**
     * @description
     * @default false
     */
    noEmit: boolean;
    include?: string[];
    /**
     * @description 排除文件 glob
     * @default
     */
    exclude?: string[];
    main?: string;
    externals?: string[];
    types?: string[];
    eol?: string;
    indent?: string;
    log?: (message: any, ...optionalParams: any[]) => void;
    verbose?: boolean;
}
export declare const DEFAULT_OPTS: IOptions;
