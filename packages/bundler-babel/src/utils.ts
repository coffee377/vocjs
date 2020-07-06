class ObjectValue {
  private readonly obj: any;

  constructor(object: object = null) {
    this.obj = Object.create(object);
  }

  add<Value = any>(name: string, value: Value): this {
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
