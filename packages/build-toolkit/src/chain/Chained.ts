/**
 * @description 条件逻辑接口
 */
interface ICondition {
  name: string;

  conditionHandler: (name: string, ...args: any[]) => boolean;

  truthyHandler: (truthy: this) => void;

  falsyHandler: (falsy: this) => void;

  emit(): this;
}

type ConditionFn<C = any> = (config: C, name: string) => boolean | undefined;
type TruthyFn<O> = (obj: O) => void;
type FalsyFn<O> = (obj: O) => void;

class Chained<Parent> implements ICondition {
  name: string;

  protected parent: Parent;

  protected conditionHandler: ConditionFn;

  protected truthyHandler: TruthyFn<this>;

  protected falsyHandler: FalsyFn<this>;

  constructor(name: string, parent: Parent) {
    this.name = name;
    this.parent = parent;
  }

  end(): Parent {
    return this.parent;
  }

  batch(handler: (obj: this) => void): this {
    handler(this);
    return this;
  }

  condition<Config = any>(conditionHandler: ConditionFn<Config>): this {
    this.conditionHandler = conditionHandler;
    return this;
  }

  truthy(truthyHandler: TruthyFn<this>): this {
    this.truthyHandler = truthyHandler;
    return this;
  }

  falsy(falsyHandler: FalsyFn<this>): this {
    this.falsyHandler = falsyHandler;
    return this;
  }

  when(conditionHandler: ConditionFn, truthyHandler?: TruthyFn<this>, falsyHandler?: FalsyFn<this>): this {
    this.conditionHandler = conditionHandler;
    this.truthyHandler = truthyHandler;
    this.falsyHandler = falsyHandler;
    return this;
  }

  emit<C>(config?: C): this {
    let condition: boolean;
    if (this.conditionHandler) {
      condition = this.conditionHandler(config, this.name);
    }
    if (condition === undefined) {
      return this;
    }
    /* 条件为真 */
    if (condition && this.truthyHandler) {
      this.truthyHandler(this);
    }
    /* 条件为假 */
    if (!!condition && this.falsyHandler) {
      this.falsyHandler(this);
    }
    return this;
  }
}

export default Chained;
