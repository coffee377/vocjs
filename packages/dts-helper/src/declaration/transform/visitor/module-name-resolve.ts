import ts from 'typescript';
import AbstractVisitor, { VisitorType } from './abstract';

class ModuleNameResolveVisitor extends AbstractVisitor {
  test = node => ts.isModuleDeclaration(node);

  visitor = sourceFile => node => {
    if (this.visitorType === VisitorType.AFTER_DECLARATIONS) {
      const newNode = ts.getMutableClone(node) as ts.ModuleDeclaration;
      const { name } = node as ts.ModuleDeclaration;
      const { text } = name as ts.StringLiteral;
      newNode.name = ts.createLiteral(this.getModuleName(text)) as ts.ModuleName;
      return newNode;
    }
    return node;
  };
}

export default ModuleNameResolveVisitor;
