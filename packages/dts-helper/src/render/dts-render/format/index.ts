import { Reflection } from 'typedoc';
import TypeFormatter from './type-formatter';

/**
 * @description 渲染接口
 */
export interface IRenderer {
  render(node: Reflection, ...args: any[]): string;
}

export * from './reflection-formatter';

export { TypeFormatter };
