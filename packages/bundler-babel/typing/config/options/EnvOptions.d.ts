export declare type ModuleType = 'amd' | 'umd' | 'systemjs' | 'commonjs' | 'cjs' | 'auto' | false;
export interface EnvOptions {
    targets?: string | Array<string> | {
        [name: string]: string;
    };
    spec?: boolean;
    loose?: boolean;
    debug?: boolean;
    modules?: ModuleType;
    include?: Array<string | RegExp>;
    exclude?: Array<string | RegExp>;
    useBuiltIns?: 'usage' | 'entry' | false;
    corejs?: 2 | 3 | {
        version: 2 | 3;
        proposals: boolean;
    };
    forceAllTransforms?: boolean;
    configPath?: string;
    ignoreBrowserslistConfig?: boolean;
    shippedProposals?: boolean;
}
