import Chained from "./Chained";
declare class ChainedSet<Parent, Value> extends Chained<Parent> {
    store: Set<Value>;
    constructor(parent: Parent);
    add(value: Value): this;
    prepend(value: Value): this;
    clear(): this;
    delete(key: string): this;
    has(key: string): boolean;
    merge(arr: Value[]): this;
    values(): Value[];
    when(condition: boolean, whenTruthy: (obj: this) => void, whenFalsy: (obj: this) => void): this;
}
export default ChainedSet;
