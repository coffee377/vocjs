import Chained from './Chained';

export interface Entry<Value> {
  [key: string]: Value;
}

export interface Entries<Value> {
  entries: Entry<Value>;
  order: string[];
}

class ChainedMap<Parent = any, Value = any> extends Chained<Parent> {
  store: Map<string, Value>;

  constructor(name: string, parent: Parent) {
    super(name, parent);
    this.store = new Map<string, Value>();
  }

  clear(): this {
    this.store.clear();
    return this;
  }

  delete(key: string): this {
    this.store.delete(key);
    return this;
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  get(key: string): Value {
    return this.store.get(key);
  }

  getOrCompute(key: string, compute: () => Value): Value {
    if (!this.has(key)) {
      const value = compute();
      this.set(key, value);
      return value;
    }
    return this.get(key);
  }

  set(key: string, value: Value): this {
    this.store.set(key, value);
    return this;
  }

  merge(obj: Entry<Value>, omit = []) {
    Object.keys(obj).forEach((key) => {
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
    // todo
    return this;
  }

  sorting(): Entries<Value> {
    const stores: [string, Value][] = [...this.store];
    const entries = stores.reduce<Entry<Value>>((previousValue, [key, value]) => {
      previousValue[key] = value;
      return previousValue;
    }, {});

    // 先根据 priority 排序
    const names = Object.keys(entries)
      .map((name) => {
        if (!entries[name]) {
          return [Number.MAX_SAFE_INTEGER, name]; // 空值排到最后
        }
        // @ts-ignore
        const { priority = 0 } = entries[name];
        return [priority, name];
      })
      .sort((a, b) => {
        return a[0] - b[0]; // 升序排序
      })
      .map((a) => a[1]);

    const order = [...names];

    // 再根据 beforeName,afterName 排序
    names.forEach((name) => {
      if (!entries[name]) {
        return;
      }

      // @ts-ignore
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

    return order.map((name) => entries[name]);
  }
}

export default ChainedMap;
