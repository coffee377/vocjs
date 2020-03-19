import ts from 'typescript';
import { TSConfig } from '../utils/tsconfig';
import { resolveFileName } from '../utils';
import { TsError } from '../utils/error';
import { Compiler } from './compiler';

export interface DeclarationFile {
  fileName: string;
  contents: string;
}

function getDeclarationFiles(tsconfig: TSConfig): DeclarationFile[] {
  const { basePath, files, compilerOptions } = tsconfig;

  const host = ts.createCompilerHost(compilerOptions, true) as ts.CompilerHost;

  const createdFiles: DeclarationFile[] = [];

  host.writeFile = (fileName: string, contents: string) => {
    const name = resolveFileName(fileName, basePath);
    createdFiles.push({ fileName: name, contents });
  };

  // create Program
  const program = ts.createProgram(files, compilerOptions, host) as ts.Program;

  // emit results
  const emitResult = program.emit(undefined, undefined, undefined, true, {
    before: [],
    after: [],
    afterDeclarations: [new Compiler().factory],
  }) as ts.EmitResult;

  const diagnostics = emitResult.diagnostics.concat(ts.getPreEmitDiagnostics(program) as ts.Diagnostic[]);

  if (diagnostics.length > 0) {
    throw TsError(diagnostics);
  }

  return createdFiles;
}

export default getDeclarationFiles;
