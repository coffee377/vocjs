export interface IOptions {
    baseDir: string;
    tsc: string;
    outDir: string;
    outFile: boolean | string;
    noEmit: boolean;
    exclude: string[];
    main?: string;
    externals?: string[];
    types?: string[];
    eol?: string;
    indent?: string;
    log?: (message: any, ...optionalParams: any[]) => void;
    verbose?: boolean;
}
