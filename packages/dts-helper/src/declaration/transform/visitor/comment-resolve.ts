import ts from 'typescript';
import AbstractVisitor from './abstract';

class CommentResolveVisitor extends AbstractVisitor {
  test = node => node.kind === ts.SyntaxKind.JSDocComment;

  visitor = (sourceFile: ts.SourceFile) => node => {
    console.log(node);
    return node;
  };
}

export default CommentResolveVisitor;
