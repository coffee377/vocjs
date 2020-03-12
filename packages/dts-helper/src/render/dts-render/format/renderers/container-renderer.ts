import { DeclarationReflection, Reflection } from 'typedoc';
import { ReflectionRenderer } from './reflection-renderer';
import TypeFormatter from '../type-formatter';
import { join, propertySorter } from '../../../../utils';
import { ReflectionSortFlags, sortMapping, ReflectionFormatter } from '../reflection-formatter';
import { Compare } from '../../../../utils/sort';

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
    if (node.typeParameters) {
      return `<${node.typeParameters.map(p => ReflectionFormatter.instance().render(p)).join(', ')}>`;
    }
    return '';
  }

  protected renderBody(node: DeclarationReflection, indentBy: number = 1, delimiter: string = ';') {
    let sorter: Compare<Reflection>;

    const isGroupType = !!['module', 'project'].find(type => type === this.type);
    const insertBlankLine = !!['class', 'module', 'interface', 'project'].find(type => type === this.type);

    sorter = propertySorter(node => node.id);

    if (
      (isGroupType && this.isSortFlag(node, ReflectionSortFlags.container)) ||
      (!isGroupType && this.isSortFlag(node, ReflectionSortFlags.leaf))
    ) {
      sorter = propertySorter(node => node.name);
    }

    const children: DeclarationReflection[] = [];
    if (node.children) {
      children.push(...node.children);
    }

    if (node.indexSignature) {
      children.push((node.indexSignature as unknown) as DeclarationReflection);
    }

    if (children.length) {
      const members = children
        .filter(node => !node.inheritedFrom)
        .filter(node => {
          const ownedSources = node.sources?.filter(s => !/^node_modules\//i.test(s.fileName));
          return !node.sources || ownedSources?.length !== 0;
        })
        .sort(sorter)
        .map(node => ReflectionFormatter.instance().render(node, delimiter))
        .filter(s => s)
        .join(insertBlankLine ? '\n\n' : '\n');

      const indent = this.indention.getIndent(indentBy);

      if (indent) {
        return members
          .split(/\r?\n(?=.)/gm)
          .map(l => `${indent}${l}`)
          .join('\n');
      }
      return members;
    }

    return '';
  }

  private isSortFlag(node: Reflection, ...flags: ReflectionSortFlags[]) {
    return !!flags.find(flag => {
      const g = this.getSortOption(node);
      // eslint-disable-next-line no-bitwise
      return (g & flag) === flag;
    });
  }

  private getSortOption(node: Reflection) {
    let current: Reflection | undefined = node;
    let sort = '';

    while (current) {
      sort = this.getTag(current, 'sortoption')?.text.trim() || '';
      if (sort) {
        break;
      }
      current = current.parent;
    }

    return sortMapping[sort] || ReflectionFormatter.sortOption;
  }
}
