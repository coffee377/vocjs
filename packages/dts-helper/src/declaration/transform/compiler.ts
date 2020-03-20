import ts from 'typescript';
import Transformer from './transformer';
import { Visitors, VisitorType } from './visitor';
import { IOptions } from '../../options';

interface ICompiler {
  run: () => ts.CustomTransformers;
}

class Compiler implements ICompiler {
  private static ins: Compiler;

  private readonly options: Partial<IOptions>;

  constructor(options: Partial<IOptions>) {
    this.options = options || {};
  }

  private getCustomTransformerFactory(type: VisitorType, options?: Partial<IOptions>) {
    const opts: any = { ...options };
    const visitors = Visitors.instance(opts);
    const v = visitors.run().filter(v => v.visitorType === type);
    if (v && v.length > 0) {
      const factory: ts.CustomTransformerFactory[] = [context => new Transformer(context, v)];
      return factory;
    }
    return undefined;
  }

  run = () => {
    const f: ts.CustomTransformers = {
      before: this.getCustomTransformerFactory(VisitorType.BEFORE, this.options),
      after: this.getCustomTransformerFactory(VisitorType.AFTER, this.options),
      afterDeclarations: this.getCustomTransformerFactory(VisitorType.AFTER_DECLARATIONS, this.options),
    };
    return f;
  };

  static instance(options?: Partial<IOptions>): Compiler {
    if (!Compiler.ins) {
      Compiler.ins = new Compiler(options);
    }
    return Compiler.ins;
  }
}

export default Compiler;
