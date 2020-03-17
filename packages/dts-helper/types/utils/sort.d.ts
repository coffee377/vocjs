declare type Selector<T> = (obj: T) => any;
export declare type Compare<T> = (a: T, b: T) => number;
export declare function propertySorter<T>(selector: Selector<T>): Compare<T>;
export {};
