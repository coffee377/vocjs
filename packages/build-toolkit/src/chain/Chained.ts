class Chained<Parent> {
  name: string;

  protected parent: Parent;

  protected condition: boolean;

  protected truthy: (truthy: this) => void;

  protected falsy: (falsy: this) => void;

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

  when(condition: boolean, whenTruthy?: (truthy: this) => void, whenFalsy?: (falsy: this) => void): this {
    this.condition = condition;
    this.truthy = whenTruthy;
    this.falsy = whenFalsy;
    return this;
  }

  emit(): this {
    if (this.condition && this.truthy) {
      this.truthy(this);
    }
    if (!!this.condition && this.falsy) {
      this.falsy(this);
    }
    return this;
  }
}

export default Chained;
