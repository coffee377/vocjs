import ts from 'typescript';
import { TSConfig } from '../utils/tsconfig';
export declare type DeclarationSourceFile = ts.SourceFile;
declare function getDeclarationFiles(tsconfig: TSConfig): DeclarationSourceFile[];
export default getDeclarationFiles;
