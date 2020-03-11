import { DeclarationReflection, Reflection } from 'typedoc/dist/lib/models';
import ContainerRenderer from './container-renderer';

export default class ProjectRenderer extends ContainerRenderer {
  constructor() {
    super('project');
  }

  public render(node: Reflection): string {
    return `declare module ${node.name} {}`;
    // return this.renderBody(node as DeclarationReflection, 0);
  }
}
