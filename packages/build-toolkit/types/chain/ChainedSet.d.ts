import Chained from "./Chained";
declare class ChainedSet<Parent, Value> extends Chained<Parent> {
    store: Set<Value>;
    constructor(name: string, parent: Parent);
    add(value: Value): this;
    prepend(value: Value): this;
    clear(): this;
    delete(value: Value): this;
    has(value: string): boolean;
    merge(arr: Value[]): this;
    values(): Value[];
}
export default ChainedSet;
