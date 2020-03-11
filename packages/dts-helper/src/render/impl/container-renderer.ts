import { DeclarationReflection, Reflection } from 'typedoc';
import ReflectionRenderer from '../reflection-renderer';
import TypeFormatter from '../type-formatter';
import { join } from '../../utils';

export default class ContainerRenderer extends ReflectionRenderer {
  private readonly type: string;

  constructor(type: string) {
    super();
    this.type = type;
  }

  render(node: Reflection, terminationCharacter: string = ''): string {
    const lines: string[] = [];
    const declarationNode = node as DeclarationReflection;
    const declarationParts: string[] = [
      this.isTop(node) ? 'declare' : '',
      ...this.getModifiers(node),
      this.type,
      `${node.name}${this.renderTypeParameters(declarationNode)}`,
    ];

    if (node.comment) {
      this.pushIfTruthy(lines, this.renderComment(node));
    }

    if (declarationNode.extendedTypes) {
      if (declarationNode.extendedTypes.length >= 1) {
        declarationParts.push('extends', TypeFormatter.format(declarationNode.extendedTypes[0]));

        if (declarationNode.extendedTypes.length > 1) {
          declarationParts.push(
            'implements',
            declarationNode.extendedTypes
              .slice(1)
              .map(t => TypeFormatter.format(t))
              .join(', '),
          );
        }
      }
    }

    lines.push(join(' ', ...declarationParts, '{'));

    const body = this.renderBody(declarationNode);
    if (body) {
      lines.push(body);
    }

    lines.push('}');

    return lines.join('\n');
  }

  protected renderTypeParameters(node: DeclarationReflection) {
    return node.name;
  }

  protected renderBody(node: DeclarationReflection, indentBy: number = 1, delimiter: string = ';') {
    return node.name;
  }
}
