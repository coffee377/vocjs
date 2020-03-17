export interface CommandOptions {
    version: string;
    outDir: string;
    outFile: boolean | string;
    noEmit: boolean;
    comment: boolean;
    verbose: boolean;
    include: string[];
    exclude: string[];
    lineBreak: string;
    indent: string;
}
declare const cmdOpts: CommandOptions;
export { cmdOpts };
