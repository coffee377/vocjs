import ts from 'typescript';
import { TSConfig } from '../utils/tsconfig';
import { slash } from '../utils';
import { TsError } from '../utils/error';

export type DeclarationSourceFile = ts.SourceFile;

function getDeclarationFiles(tsconfig: TSConfig): DeclarationSourceFile[] {
  const { files, compilerOptions } = tsconfig;

  const host = ts.createCompilerHost(compilerOptions, true) as ts.CompilerHost;

  const program = ts.createProgram(files, compilerOptions, host) as ts.Program;

  const declarationFileMap: Map<string, DeclarationSourceFile> = new Map<string, DeclarationSourceFile>();

  function writeFile(filename: string, data: string) {
    // 非声明文件或声明文件已经存在
    if (filename.slice(-5) !== '.d.ts' || declarationFileMap.has(filename)) {
      return;
    }

    const sourceFile = ts.createSourceFile(filename, data, compilerOptions.target, true) as ts.SourceFile;
    declarationFileMap.set(filename, sourceFile);
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
  const map = Array.from(declarationFileMap);

  const declarationFiles: DeclarationSourceFile[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [k, v] of map) {
    declarationFiles.push(v);
  }

  return declarationFiles;
}

export default getDeclarationFiles;
