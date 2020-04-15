class ObjectValue {
  private readonly obj: any;

  constructor(object: object = null) {
    this.obj = Object.create(object);
  }

  add<Value = any>(name: string, value: Value): this {
    // if (typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number') {
    //   this.obj[name] = value;
    // }
    // if (value instanceof String || value instanceof Boolean || value instanceof Number) {
    //   this.obj[name] = value;
    // }
    // if (value instanceof Map) {
    // }
    // if (value instanceof Set) {
    // }
    if (value !== undefined && value !== null) {
      this.obj[name] = value;
    }
    return this;
  }

  remove(name: string): this {
    delete this.obj[name];
    return this;
  }

  toObject<Object = object>(): Object {
    return this.obj;
  }

  static of(obj?: object) {
    return new ObjectValue(obj);
  }
}

export default ObjectValue;
