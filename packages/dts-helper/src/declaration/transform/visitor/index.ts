import BaseVisitor, { IVisitor, VisitorOptions, VisitorType } from './abstract';
import ImportPathResolveVisitor from './import-path-resolve';
import ExportPathResolveVisitor from './export-path-resolve';
import ModuleNameResolveVisitor from './module-name-resolve';

class Visitors {
  private static ins: Visitors;

  private readonly options: VisitorOptions;

  private readonly visitorMap: Map<string, IVisitor> = new Map<string, IVisitor>();

  constructor(options?: VisitorOptions) {
    this.options = options;
  }

  run(): IVisitor[] {
    const opts: VisitorOptions = { ...this.options, visitorType: VisitorType.AFTER_DECLARATIONS };
    return [new ImportPathResolveVisitor(opts), new ExportPathResolveVisitor(opts), new ModuleNameResolveVisitor(opts)];
  }

  add = (visitor: IVisitor, opts?: any) => {};

  remove = () => {};

  static instance(options?: any): Visitors {
    if (!Visitors.ins) {
      Visitors.ins = new Visitors(options);
    }
    return Visitors.ins;
  }
}

export { VisitorType, IVisitor, BaseVisitor, Visitors };
