import ts from 'typescript';

const TsError: (diagnostics: ts.Diagnostic[]) => Error = diagnostics => {
  let message = 'Declaration generation failed';

  diagnostics.forEach(diagnostic => {
    // not all errors have an associated file: in particular, problems with a
    // the tsconfig.json don't; the messageText is enough to diagnose in those
    // cases.
    if (diagnostic.file) {
      const sourceFile = diagnostic.file as ts.SourceFile;
      const position = sourceFile.getLineAndCharacterOfPosition(diagnostic.start) as ts.LineAndCharacter;

      message +=
        `\n${diagnostic.file.fileName}(${position.line + 1},${position.character + 1}): ` +
        `error TS${diagnostic.code}: ${diagnostic.messageText}`;
    } else {
      message += `\nError TS${diagnostic.code}: ${diagnostic.messageText}`;
    }
  });

  const error = new Error(message);
  error.name = 'EmitterError';
  return error;
};

export { TsError };
