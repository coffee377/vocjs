export interface Orderable {
  before(name: string): this;

  after(name: string): this;

  order(index: number): this;
}
