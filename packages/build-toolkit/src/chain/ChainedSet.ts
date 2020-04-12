import Chained from './Chained';

class ChainedSet<Parent, Value> extends Chained<Parent> {
  store: Set<Value>;

  constructor(parent: Parent) {
    super(parent);
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

  clear() {
    this.store.clear();
    return this;
  }

  delete(key: string) {
    // this.store.delete(value);
    return this;
  }

  has(key: string): boolean {
    // return this.store.has(value);
    return false;
  }

  merge(arr: Value[]) {
    this.store = new Set([...this.store, ...arr]);
    return this;
  }

  values(): Value[] {
    return [...this.store];
  }

  when(condition: boolean, whenTruthy: (obj: this) => void, whenFalsy: (obj: this) => void) {
    if (condition) {
      whenTruthy(this);
    } else {
      whenFalsy(this);
    }
    return this;
  }
}

export default ChainedSet;
