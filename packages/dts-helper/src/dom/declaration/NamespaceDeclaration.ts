import { Declaration } from './abstract';
import { Node } from '../node';

interface NamespaceNode extends Node {}

export class NamespaceDeclaration extends Declaration<NamespaceNode> {
  render(): string {
    return '';
  }
}
