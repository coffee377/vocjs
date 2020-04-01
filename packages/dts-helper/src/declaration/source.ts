import ts from 'typescript';
import { TSConfig } from '../utils/tsconfig';
import { resolveFileName } from '../utils';
import { TsError } from '../utils/error';
import { Compiler } from './transform';

export interface DeclarationFile {
  fileName: string;
  contents: string;
}

function getDeclarationFiles(tsconfig: TSConfig): DeclarationFile[] {
  const { basePath, files, compilerOptions, options } = tsconfig;

  const host = ts.createCompilerHost(compilerOptions, true) as ts.CompilerHost;

  const createdFiles: DeclarationFile[] = [];

  host.writeFile = (fileName: string, contents: string) => {
    const name = resolveFileName(fileName, basePath);
    createdFiles.push({ fileName: name, contents });
  };

  // create Program
  const program = ts.createProgram(files, compilerOptions, host) as ts.Program;

  // todo 拦截处理是这做的，需要传递参数 options
  const tf: ts.CustomTransformers = Compiler.instance(options).run();

  // emit results
  const emitResult = program.emit(undefined, undefined, undefined, true, tf) as ts.EmitResult;

  // const diagnostics = emitResult.diagnostics.concat(ts.getPreEmitDiagnostics(program) as ts.Diagnostic[]);
  const diagnostics = emitResult.diagnostics as ts.Diagnostic[];

  if (diagnostics.length > 0) {
    throw TsError(diagnostics);
  }

  return createdFiles;
}

export default getDeclarationFiles;
