import path from 'path';
import ts from 'typescript';
import { propertySorter } from './sort';

const slash = (path: string) => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path); // eslint-disable-line no-control-regex

  if (isExtendedLengthPath || hasNonAscii) {
    return path;
  }

  return path.replace(/\\/g, '/');
};

function join(delimiter: string, ...values: any[]): string {
  return values.filter(v => v !== null && v !== undefined && v !== '').join(delimiter);
}

function resolveFileName(fileName: string, baseDir: string = '.') {
  if (!fileName) {
    throw new Error(`The file name cannot be empty`);
  }
  return path.resolve(baseDir, fileName);
}

function processTree(sourceFile: ts.SourceFile, replacer: (node: ts.Node) => string): string {
  let code = '';
  let cursorPosition = 0;

  function skip(node: ts.Node) {
    cursorPosition = node.end;
  }

  function readThrough(node: ts.Node) {
    code += sourceFile.text.slice(cursorPosition, node.pos);
    cursorPosition = node.pos;
  }

  function visit(node: ts.Node) {
    readThrough(node);

    const replacement = replacer(node);

    if (replacement != null) {
      code += replacement;
      skip(node);
    } else {
      ts.forEachChild<void>(node, visit);
    }
  }

  visit(sourceFile);

  code += sourceFile.text.slice(cursorPosition);

  return code;
}

export { slash, join, resolveFileName, propertySorter, processTree };
