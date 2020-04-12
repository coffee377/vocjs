import Chained from "./Chained";
export interface Entry<Value> {
    [key: string]: Value;
}
export interface Entries<Value> {
    entries: Entry<Value>;
    order: string[];
}
declare class ChainedMap<Parent = any, Value = any> extends Chained<Parent> {
    store: Map<string, Parent>;
    config: Parent;
    protected conditionValue: boolean;
    protected truthy: (truthy: this) => void;
    protected falsy: (falsy: this) => void;
    constructor(parent: Parent);
    clear(): this;
    delete(key: string): this;
    has(key: string): boolean;
    get(key: string): Value;
    getOrCompute(key: string, compute: () => Value): Value;
    set(key: string, value: Value): this;
    merge(obj: Entry<Value>, omit?: any[]): this;
    protected sorting(): Entries<Value>;
    keys(): string[];
    entries(): Entry<Value>;
    values(): Value[];
    when(condition: boolean, whenTruthy?: (truthy: this) => void, whenFalsy?: (falsy: this) => void): this;
    emit(condition: boolean): this;
    condition(nameFn: (name: string) => string, config?: any): this;
}
export default ChainedMap;
