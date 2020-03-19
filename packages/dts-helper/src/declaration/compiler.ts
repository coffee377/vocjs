import ts from 'typescript';

interface TransformType {
  /** Custom transformers to evaluate before built-in .js transformations. */
  before;
  /** Custom transformers to evaluate after built-in .js transformations. */
  after;
  /** Custom transformers to evaluate after built-in .d.ts transformations. */
  afterDeclarations;
}

interface IVisitor {
  test: (node: ts.Node) => boolean;
  visitor?: (sourceFile: ts.SourceFile) => ts.Visitor;
}

abstract class AbstractVisitor implements IVisitor {
  private static getExternalModuleNames(sf: ts.SourceFile): string[] {
    const externalModuleNames: string[] = [];
    const modules: Map<string, { isExternalLibraryImport: boolean }> = sf['resolvedModules'];
    if (modules) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [k, v] of modules.entries()) {
        if (v.isExternalLibraryImport) {
          externalModuleNames.push(k);
        }
      }
    }
    return externalModuleNames;
  }

  isExternalModule(node, moduleName: string): boolean {
    if (ts.isSourceFile(node)) {
      return AbstractVisitor.getExternalModuleNames(node as ts.SourceFile).some(name => name === moduleName);
    }
    return false;
  }

  isInternalModule(node, moduleName: string): boolean {
    return !this.isExternalModule(node, moduleName);
  }

  moduleName(name: string, prefix?: string): string {
    if (prefix) {
      const result: string = name.replace(/\/?(\/|index)?$/, '');
      if (result) {
        return `${prefix}/${result}`;
      }
      return prefix;
    }
    return name;
  }

  abstract test: (node: ts.Node) => boolean;

  abstract visitor: (sourceFile: ts.SourceFile) => ts.Visitor;
}

class ModuleNameVisitor extends AbstractVisitor {
  test = node => ts.isModuleDeclaration(node);

  visitor = sourceFile => node => {
    if (ts.isModuleDeclaration(node)) {
      const newNode = ts.getMutableClone(node) as ts.ModuleDeclaration;
      const { name } = node as ts.ModuleDeclaration;
      const { text } = name as ts.StringLiteral;
      newNode.name = ts.createLiteral(this.moduleName(text, 'kylin-client')) as ts.ModuleName;
      return newNode;
    }
    return node;
  };
}

class ImportVisitor extends AbstractVisitor {
  test = node => ts.isImportDeclaration(node);

  visitor = sourceFile => node => {
    const { moduleSpecifier } = node as ts.ImportDeclaration;
    const { text } = moduleSpecifier as ts.StringLiteral;

    if (this.isInternalModule(sourceFile, text)) {
      const newNode = ts.getMutableClone(node) as ts.ImportDeclaration;
      newNode.moduleSpecifier = ts.createLiteral(this.moduleName(text, 'kylin-client')) as ts.Expression;
      return newNode;
    }

    return node;
  };
}

class ExportVisitor extends AbstractVisitor {
  test = node => ts.isExportDeclaration(node);

  visitor = sourceFile => node => {
    const { moduleSpecifier } = node as ts.ExportDeclaration;
    if (moduleSpecifier) {
      const { text } = moduleSpecifier as ts.StringLiteral;
      if (this.isInternalModule(sourceFile, text)) {
        const newNode = ts.getMutableClone(node) as ts.ExportDeclaration;
        newNode.moduleSpecifier = ts.createLiteral(this.moduleName(text, 'kylin-client')) as ts.Expression;
        return newNode;
      }
    }
    return node;
  };
}

class Transformer implements ts.CustomTransformer {
  private readonly context: ts.TransformationContext;

  private readonly visitors: IVisitor[];

  constructor(context: ts.TransformationContext, visitors?: IVisitor[]) {
    this.context = context;
    this.visitors = visitors;
  }

  transformBundle(node) {
    if (ts.isBundle(node)) {
      const { prepends, sourceFiles } = node;
      const newSourceFiles = [];
      sourceFiles.forEach(sourceFile => {
        newSourceFiles.push(this.transformSourceFile(sourceFile));
      });
      return ts.createBundle(newSourceFiles, prepends);
    }
    return node;
  }

  transformSourceFile(node) {
    if (ts.isSourceFile(node)) {
      const sf: ts.SourceFile = node;
      const visitor = node => {
        const visitors = Array.from(new Set(this.visitors || []));

        // eslint-disable-next-line no-restricted-syntax
        for (const item of visitors) {
          const { test, visitor } = item;
          // 满足条件的节点处理
          if (test(node) && visitor) {
            node = visitor(sf)(node);
          }
        }

        // 递归处理所有节点
        return ts.visitEachChild(node, visitor, this.context);
      };
      return ts.visitNode(node, visitor);
    }
    return node;
  }
}

const visitors: IVisitor[] = [new ImportVisitor(), new ExportVisitor(), new ModuleNameVisitor()];

export class Compiler {
  factory: ts.CustomTransformerFactory = context => new Transformer(context, visitors);
}
