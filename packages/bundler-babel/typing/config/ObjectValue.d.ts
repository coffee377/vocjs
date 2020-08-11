declare class ObjectValue {
    private readonly obj;
    constructor(object?: object);
    add<Value = any>(name: string, value: Value): this;
    remove(name: string): this;
    toObject<Object = object>(): Object;
    static of(obj?: object): ObjectValue;
}
export default ObjectValue;
