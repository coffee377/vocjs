import { SyncHook, SyncWaterfallHook } from 'tapable';
import Chained from './Chained';
import Options from '../babel/Options';

export interface Entry<Value> {
  [key: string]: Value;
}

export interface Entries<Value> {
  entries: Entry<Value>;
  order: string[];
}

class ChainedMap<Parent = any, Value = any> extends Chained<Parent> {
  store: Map<string, Parent>;

  config: Parent;

  protected conditionValue: boolean;

  protected truthy: (truthy: this) => void;

  protected falsy: (falsy: this) => void;

  constructor(parent: Parent) {
    super(parent);
    this.config = parent;
    this.store = new Map<string, Parent>();
  }

  clear() {
    this.store.clear();
    return this;
  }

  delete(key: string) {
    this.store.delete(key);
    return this;
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  get(key: string): Value {
    return this.store.get(key);
  }

  getOrCompute(key: string, compute: () => Value) {
    if (!this.has(key)) {
      const value = compute();
      this.set(key, value);
      return value;
    }
    return this.get(key);
  }

  set(key: string, value: Value) {
    this.store.set(key, value);
    return this;
  }

  merge(obj: Entry<Value>, omit = []) {
    Object.keys(obj).forEach(key => {
      if (omit.includes(key)) {
        return;
      }
      const value = obj[key];
      if (!this.has(key) || value === null || (!Array.isArray(value) && typeof value !== 'object')) {
        this.set(key, value);
      } else {
        // todo merge
        // this.set(key, merge(this.get(key), value));
      }
    });
    return this;
  }

  protected sorting(): Entries<Value> {
    const stores: [string, Value][] = [...this.store];
    const entries = stores.reduce<Entry<Value>>((previousValue, [key, value]) => {
      previousValue[key] = value;
      return previousValue;
    }, {});

    // 先根据 priority 排序
    const names = Object.keys(entries)
      .map(name => {
        const { priority = 0 } = entries[name];
        return [priority, name];
      })
      .sort((a, b) => {
        return a[0] - b[0]; // 升序排序
      })
      .map(a => a[1]);

    const order = [...names];

    // 再根据 beforeName,afterName 排序
    names.forEach(name => {
      if (!entries[name]) {
        return;
      }

      const { beforeName, afterName } = entries[name];

      if (beforeName && order.includes(beforeName)) {
        order.splice(order.indexOf(name), 1);
        order.splice(order.indexOf(beforeName), 0, name);
      } else if (afterName && order.includes(afterName)) {
        order.splice(order.indexOf(name), 1);
        order.splice(order.indexOf(afterName) + 1, 0, name);
      }
    });

    return { entries, order };
  }

  keys(): string[] {
    const { order } = this.sorting();
    return order;
  }

  entries(): Entry<Value> {
    const { entries, order } = this.sorting();

    if (order.length) {
      return entries;
    }

    return {};
  }

  values(): Value[] {
    const { entries, order } = this.sorting();

    return order.map(name => entries[name]);
  }

  when(condition: boolean, whenTruthy?: (truthy: this) => void, whenFalsy?: (falsy: this) => void): this {
    this.truthy = whenTruthy;
    this.falsy = whenFalsy;
    return this.emit(condition);
  }

  emit(condition: boolean): this {
    this.conditionValue = condition;
    if (this.conditionValue && this.truthy) {
      this.truthy(this);
    }
    if (!this.conditionValue && this.falsy) {
      this.falsy(this);
    }
    return this;
  }

  condition(nameFn: (name: string) => string, config: any = {}): this {
    let result: boolean = false;
    const name = nameFn(this.name);
    if (typeof config === 'object' && config[name] && typeof config[name] === 'boolean') {
      result = config[name];
    }
    return this.emit(result);
  }
}

export default ChainedMap;
