// import {DeclarationBase, EnumMemberDeclaration, Type} from "./dom";

interface Comment {}

export interface Node {
  /**
   * @description 节点名称
   */
  name: string;

  /**
   * @description 节点类型
   */
  kind: string;

  /**
   * @description 节点注释
   */
  comment?: Comment;

  /**
   * @description 节点层级
   * @default 0
   */
  level?: number;

  /**
   * @description 节点排序
   * @default 0
   */
  sort?: number;

  /**
   * @description 子节点
   * @default
   */
  children?: Node[];
}

//
// enum KindType {}
//
// interface EnumMemberNode extends Node {
//   kind: 'enum-value';
//   name: string;
//   value?: string | number;
// }
//
// export interface EnumNode extends Node {
//   kind: "enum";
//   name: string;
//   children: EnumMemberNode[];
//   constant: boolean;
// }
//
// export interface PropertyNode extends Node {
//   kind: "property";
//   name: string;
//   type: Type;
// }
//
// class BaseDeclaration<T extends Node> {
//   private node: T;
//
//   constructor(node: T) {
//     this.node = node;
//   }
//
//   render(): string {
//     return '';
//   }
//
//   // isTopLevel = () => this.level === 0;
// }
//
// // class EnumMemberDeclaration extends BaseDeclaration<any> {}
// import { NumberLiteral, StringLiteral } from './dom';

/**
 * 原始类型
 */
export type PrimitiveType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'any'
  | 'void'
  | 'object'
  | 'null'
  | 'undefined'
  | 'true'
  | 'false';

export type ThisType = 'this';

export enum DeclarationFlags {
  None = 0,
  Private = 1 << 0,
  Protected = 1 << 1,
  Static = 1 << 2,
  Optional = 1 << 3,
  Export = 1 << 4,
  Abstract = 1 << 5,
  ExportDefault = 1 << 6,
  ReadOnly = 1 << 7,
}

export enum ParameterFlags {
  None = 0,
  Optional = 1 << 0,
  Rest = 1 << 1,
}

function emit(node: string): string {
  return '';
}
