import Chained from './Chained';

class ChainedSet<Parent, Value> extends Chained<Parent> {
  store: Set<Value>;

  constructor(name: string, parent: Parent) {
    super(name, parent);
    this.store = new Set<Value>();
  }

  add(value: Value) {
    this.store.add(value);
    return this;
  }

  prepend(value: Value) {
    this.store = new Set([value, ...this.store]);
    return this;
  }

  clear(): this {
    this.store.clear();
    return this;
  }

  delete(value: Value): this {
    this.store.delete(value);
    return this;
  }

  has(value: string): boolean {
    return this.store.has(value);
  }

  merge(arr: Value[]) {
    this.store = new Set([...this.store, ...arr]);
    return this;
  }

  values(): Value[] {
    return [...this.store];
  }
}

export default ChainedSet;
