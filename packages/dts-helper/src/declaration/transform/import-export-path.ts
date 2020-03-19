import ts from 'typescript';

export function transform<T = ts.Bundle | ts.SourceFile>(): ts.TransformerFactory<T> {
  return context => node => {
    const sourceFileVisitor = (sf, ctx) => {
      const visitor = node => {
        console.log('======', node.kind);
        // todo 需要处理的逻辑
        return ts.visitEachChild(node, visitor, ctx);
      };
      return ts.visitNode(sf, visitor);
    };

    const bundleVisitor = (bundle, ctx) => {
      const sourceFiles = node['sourceFiles'] as ts.SourceFile[];
      const prepends = node['prepends'] as (ts.InputFiles | ts.UnparsedSource)[];
      const newSourceFiles: ts.SourceFile[] = [];
      sourceFiles.forEach(sf => {
        newSourceFiles.push(sourceFileVisitor(sf, ctx) as ts.SourceFile);
      });

      return ts.createBundle(newSourceFiles, prepends);
    };

    if (ts.isSourceFile(node)) {
      return sourceFileVisitor(node, context);
    }
    if (ts.isBundle(node)) {
      return bundleVisitor(node, context);
    }
    return node;
  };
}
