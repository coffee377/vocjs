import ts from 'typescript';
import { propertySorter } from './sort';
declare const slash: (path: string) => string;
declare function join(delimiter: string, ...values: any[]): string;
declare function resolveFileName(fileName: string, baseDir?: string): string;
declare function processTree(sourceFile: ts.SourceFile, replacer: (node: ts.Node) => string): string;
export { slash, join, resolveFileName, propertySorter, processTree };
