import Chained from "./Chained";
export interface Entry<Value> {
    [key: string]: Value;
}
export interface Entries<Value> {
    entries: Entry<Value>;
    order: string[];
}
declare class ChainedMap<Parent = any, Value = any> extends Chained<Parent> {
    store: Map<string, Value>;
    constructor(name: string, parent: Parent);
    clear(): this;
    delete(key: string): this;
    has(key: string): boolean;
    get(key: string): Value;
    getOrCompute(key: string, compute: () => Value): Value;
    set(key: string, value: Value): this;
    merge(obj: Entry<Value>, omit?: any[]): this;
    sorting(): Entries<Value>;
    keys(): string[];
    entries(): Entry<Value>;
    values(): Value[];
}
export default ChainedMap;
