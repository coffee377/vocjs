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
declare type ConditionFn<C = any> = (config: C, name: string) => boolean | undefined;
declare type TruthyFn<O> = (obj: O) => void;
declare type FalsyFn<O> = (obj: O) => void;
declare class Chained<Parent> implements ICondition {
    name: string;
    protected parent: Parent;
    protected conditionHandler: ConditionFn;
    protected truthyHandler: TruthyFn<this>;
    protected falsyHandler: FalsyFn<this>;
    constructor(name: string, parent: Parent);
    end(): Parent;
    batch(handler: (obj: this) => void): this;
    condition<Config = any>(conditionHandler: ConditionFn<Config>): this;
    truthy(truthyHandler: TruthyFn<this>): this;
    falsy(falsyHandler: FalsyFn<this>): this;
    when(conditionHandler: ConditionFn, truthyHandler?: TruthyFn<this>, falsyHandler?: FalsyFn<this>): this;
    emit<C>(config?: C): this;
}
export default Chained;
