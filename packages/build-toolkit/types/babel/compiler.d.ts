import { DestOptions, SrcOptions } from 'vinyl-fs';
import { TransformOptions } from '@babel/core';
import { SyncHook, SyncWaterfallHook } from 'tapable';
import { IBabelConfigOpts } from "./getBabelConfig";
import Stats from "./Stats";
export interface CompileOptions extends IBabelConfigOpts {
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
interface CompilerHooks {
    initialize: SyncHook;
    options: SyncWaterfallHook<TransformOptions>;
    done: SyncHook<Stats>;
    afterDone: SyncHook<Stats>;
    failed: SyncHook<Error>;
}
declare class Compiler {
    readonly hooks: CompilerHooks;
    running: boolean;
    watchMode: boolean;
    options: CompileOptions;
    private babelTransformOptions;
    constructor(opts?: CompileOptions);
    run(): Promise<Stats>;
    private registerBabelOptions;
    watch(): Promise<void>;
}
export { write, Compiler };
export default Compiler;
