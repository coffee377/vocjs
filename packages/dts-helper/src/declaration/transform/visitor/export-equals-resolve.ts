import ts from 'typescript';
import AbstractVisitor, { VisitorType } from './abstract';

class ExportEqualsResolveVisitor extends AbstractVisitor {
  test = node => ts.isExportAssignment(node);

  visitor = sourceFile => node => {
    const { exportEquals } = this.options;
    if (this.visitorType === VisitorType.AFTER_DECLARATIONS && exportEquals) {
      const newNode = ts.getMutableClone(node) as ts.ExportAssignment;
      newNode.isExportEquals = exportEquals;
      return newNode;
    }
    return node;
  };
}

export default ExportEqualsResolveVisitor;
