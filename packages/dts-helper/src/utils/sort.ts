type Selector<T> = (obj: T) => any;
export type Compare<T> = (a: T, b: T) => number;

export function propertySorter<T>(selector: Selector<T>): Compare<T> {
  return (a, b) => {
    const valA = selector(a);
    const valB = selector(b);

    if (valA > valB) {
      return 1;
    }
    if (valA < valB) {
      return -1;
    }
    return 0;
  };
}
