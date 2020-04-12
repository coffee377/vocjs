import { DestOptions, SrcOptions } from 'vinyl-fs';
import { TransformOptions } from '@babel/core';
import { SyncHook, SyncWaterfallHook } from 'tapable';
import Stats from "./Stats";
import Options, { IConfig } from "./Options";
export interface CompileOptions extends IConfig {
    cwd?: string;
    src?: string;
    dest?: string;
    exclude?: string[];
    watch?: boolean;
}
export interface IWriteOptions {
    globs: string | string[];
    destFolder: string;
    srcOpts?: SrcOptions;
    destOpts?: DestOptions;
}
/**
 * 输出编译文件
 * @param opts
 * @param babelOpts
 * @param ext
 */
declare const write: (opts: IWriteOptions, babelOpts?: TransformOptions, ext?: string) => Promise<Error>;
interface CompilerHook {
    initialize: SyncHook;
    options: SyncWaterfallHook<Options>;
    done: SyncHook<Stats>;
    afterDone: SyncHook<Stats>;
    failed: SyncHook<Error>;
}
declare class Compiler {
    readonly hook: CompilerHook;
    running: boolean;
    watchMode: boolean;
    private readonly compilerOptions;
    options: Options;
    constructor(opts?: CompileOptions);
    run(): Promise<Stats>;
    private registerBabelOptions;
    watch(): Promise<void>;
}
export { write, Compiler };
export default Compiler;
