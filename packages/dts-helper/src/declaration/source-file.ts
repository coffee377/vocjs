import ts from 'typescript';
import { TSConfig } from '../utils/tsconfig';
import { slash } from '../utils';
import { TsError } from '../utils/error';

export type DeclarationSourceFile = ts.SourceFile;

function getDeclarationFiles(tsconfig: TSConfig): DeclarationSourceFile[] {
  const [files, compilerOptions] = tsconfig;

  const host = ts.createCompilerHost(compilerOptions, true) as ts.CompilerHost;

  const program = ts.createProgram(files, compilerOptions, host) as ts.Program;

  const declarationFiles: DeclarationSourceFile[] = [];

  function writeFile(filename: string, data: string) {
    if (filename.slice(-5) !== '.d.ts') {
      return;
    }

    const sourceFile = ts.createSourceFile(filename, data, compilerOptions.target, true) as ts.SourceFile;
    declarationFiles.push(sourceFile);
  }

  program
    .getSourceFiles()
    .filter(
      sourceFile =>
        sourceFile.fileName.slice(-5) !== '.d.ts' && files.some(file => file === slash(sourceFile.fileName)),
    )
    .forEach(sourceFile => {
      const emitOutput = program.emit(sourceFile, writeFile, undefined, true);
      if (emitOutput.emitSkipped || emitOutput.diagnostics.length > 0) {
        throw TsError(
          emitOutput.diagnostics
            .concat(program.getSemanticDiagnostics(sourceFile))
            .concat(program.getSyntacticDiagnostics(sourceFile))
            .concat(program.getDeclarationDiagnostics(sourceFile)),
        );
      }
    });
  return declarationFiles;
}

export default getDeclarationFiles;
