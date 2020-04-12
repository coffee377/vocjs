class Chained<Parent> {
  name: string;

  protected parent: Parent;

  constructor(parent: Parent) {
    this.parent = parent;
  }

  end() {
    return this.parent;
  }

  batch(handler: (obj: this) => void) {
    handler(this);
    return this;
  }
}

export default Chained;
