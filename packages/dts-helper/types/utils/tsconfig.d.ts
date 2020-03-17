import ts from 'typescript';
import { IOptions } from '../options';
export interface TSConfig {
    basePath: string;
    files: string[];
    compilerOptions: ts.CompilerOptions;
}
declare const readConfig: (file: string) => TSConfig;
declare const mergeConfig: (tsConfig: TSConfig, options: IOptions) => TSConfig;
declare const getConfig: (file: string, options: IOptions) => TSConfig;
export { readConfig, mergeConfig, getConfig };
