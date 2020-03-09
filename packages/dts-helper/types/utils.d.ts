/// <reference types="node" />
import ts from 'typescript';
import * as fs from 'fs-extra';
import { IOptions } from './options';
declare const slash: (path: string) => string;
declare const getError: (diagnostics: ts.Diagnostic[]) => Error;
export declare type TSConfig = [string[], ts.CompilerOptions];
declare function getTSConfig(tsconfigFileName: string, options: IOptions): TSConfig;
declare function getFileNames(baseDir: string, files: string[]): string[];
declare function resolveFileName(baseDir: string, fileName: string): string;
declare type WDF<T = void> = (declarationFiles: ts.SourceFile[], opts: IOptions) => Promise<T>;
declare const writeDeclarationFile: WDF<void>;
export { getError, getTSConfig, getFileNames, slash, resolveFileName, write, writeDeclarationFile, resolveModule };
declare function write<T = void>(baseDir: string, fileName: string, callback?: (stream: fs.WriteStream) => void): Promise<T>;
interface Module {
    fileName: string;
    id: string;
    path: string[];
    name: string;
}
declare function resolveModule(dtsFile: string, opts?: IOptions): Module;
