import ts from 'typescript';
import AbstractVisitor, { VisitorType } from './abstract';

class ExportPathResolveVisitor extends AbstractVisitor {
  test = node => ts.isExportDeclaration(node);

  visitor = sourceFile => node => {
    if (this.visitorType === VisitorType.AFTER_DECLARATIONS) {
      const { moduleSpecifier } = node as ts.ExportDeclaration;
      if (moduleSpecifier) {
        const { text } = moduleSpecifier as ts.StringLiteral;
        if (this.isInternalModule(sourceFile, text)) {
          const newNode = ts.getMutableClone(node) as ts.ExportDeclaration;
          newNode.moduleSpecifier = ts.createLiteral(this.getModuleName(text)) as ts.Expression;
          return newNode;
        }
      }
    }
    return node;
  };
}

export default ExportPathResolveVisitor;
