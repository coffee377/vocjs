import { Node } from '../node';

export abstract class Declaration<T extends Node> {
  private readonly node: T;

  public constructor(node: T) {
    this.node = node;
  }

  protected before = () => '';

  abstract render(): string;

  protected after = () => '';

  out(): string {
    return this.before() + this.render() + this.after();
  }
}
