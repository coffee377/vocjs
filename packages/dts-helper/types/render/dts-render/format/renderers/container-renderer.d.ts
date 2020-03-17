import { DeclarationReflection, Reflection } from 'typedoc';
import { ReflectionRenderer } from './reflection-renderer';
export default class ContainerRenderer extends ReflectionRenderer {
    private readonly type;
    constructor(type: string);
    render(node: Reflection, terminationCharacter?: string): string;
    protected renderTypeParameters(node: DeclarationReflection): string;
    protected renderBody(node: DeclarationReflection, indentBy?: number, delimiter?: string): string;
    private isSortFlag;
    private getSortOption;
}
