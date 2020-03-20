import ts from 'typescript';
import { IVisitor } from './visitor';

class Transformer implements ts.CustomTransformer {
  private readonly context: ts.TransformationContext;

  private readonly visitors: IVisitor[];

  constructor(context: ts.TransformationContext, visitors?: IVisitor[]) {
    this.context = context;
    this.visitors = visitors;
  }

  transformBundle(bundle) {
    if (ts.isBundle(bundle)) {
      const { prepends, sourceFiles } = bundle;
      const newSourceFiles = [];
      sourceFiles.forEach(sourceFile => {
        newSourceFiles.push(this.transformSourceFile(sourceFile));
      });
      return ts.createBundle(newSourceFiles, prepends);
    }
    return bundle;
  }

  transformSourceFile(source) {
    if (ts.isSourceFile(source)) {
      const sf: ts.SourceFile = source;
      const visitor = node => {
        // if (node.kind === ts.SyntaxKind.JSDocComment) {
        //   console.log(' >>>>>> ', node);
        // }
        const visitors = Array.from(new Set(this.visitors || []));

        // eslint-disable-next-line no-restricted-syntax
        for (const item of visitors) {
          const { test, visitor } = item;
          // 满足条件的节点处理
          if (test && visitor && test(node)) {
            node = visitor(sf)(node);
          }
        }

        // 递归处理所有节点
        return ts.visitEachChild(node, visitor, this.context);
      };
      return ts.visitNode(source, visitor);
    }
    return source;
  }
}

export default Transformer;
