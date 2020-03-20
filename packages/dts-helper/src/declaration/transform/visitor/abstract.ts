import ts from 'typescript';
import { IOptions } from '../../../options';

export enum VisitorType {
  /** Custom transformers to evaluate before built-in .js transformations. */
  BEFORE = 'before',
  /** Custom transformers to evaluate after built-in .js transformations. */
  AFTER = 'after',
  /** Custom transformers to evaluate after built-in .d.ts transformations. */
  AFTER_DECLARATIONS = 'afterDeclarations',
}

export interface VisitorOptions extends IOptions {
  /**
   * @description 模块名称前缀
   */
  modulePrefix?: string;
  /**
   * @description 访问者类型
   * @default VisitorType.BEFORE
   */
  visitorType?: VisitorType;

  [key: string]: any;
}

export interface IVisitor {
  /**
   * @description 访问类型
   */
  readonly visitorType: VisitorType;
  /**
   * @description 配置参数
   */
  readonly options?: VisitorOptions;
  /**
   * @description 满足条件的节点
   * @param node AST 节点
   */
  test: (node: ts.Node) => boolean;
  /**
   * @description 访问者
   * @param sourceFile
   */
  visitor: (sourceFile: ts.SourceFile) => ts.Visitor;
}

abstract class AbstractVisitor implements IVisitor {
  readonly visitorType: VisitorType;

  readonly options: VisitorOptions;

  constructor(options?: VisitorOptions) {
    this.options = options;
    this.visitorType = options.visitorType || VisitorType.BEFORE;
  }

  /**
   * @description 获取外部模块名称
   * @param sf
   */
  private static getExternalModuleNames(sf: ts.SourceFile): string[] {
    const externalModuleNames: string[] = [];
    const modules: Map<string, { isExternalLibraryImport: boolean }> = sf['resolvedModules'];
    if (modules) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [k, v] of modules.entries()) {
        if (v && v.isExternalLibraryImport) {
          externalModuleNames.push(k);
        }
      }
    }
    return externalModuleNames;
  }

  /**
   * @description 是否外面模块
   * @param node
   * @param moduleName
   */
  isExternalModule(node, moduleName: string): boolean {
    if (ts.isSourceFile(node)) {
      return AbstractVisitor.getExternalModuleNames(node as ts.SourceFile).some(name => name === moduleName);
    }
    return false;
  }

  /**
   * @description 是否内部模块
   * @param node
   * @param moduleName
   */
  isInternalModule(node, moduleName: string): boolean {
    return !this.isExternalModule(node, moduleName);
  }

  /**
   * @description 获取完整模块名称
   * @param name
   */
  getModuleName(name: string): string {
    const { outFile, modulePrefix } = this.options;
    if (outFile && modulePrefix) {
      const result: string = name.replace(/\/?(\/|index)?$/, '');
      if (result) {
        return `${modulePrefix}/${result}`;
      }
      return modulePrefix;
    }
    return name;
  }

  abstract test: (node: ts.Node) => boolean;

  abstract visitor: (sourceFile: ts.SourceFile) => ts.Visitor;
}

export default AbstractVisitor;
