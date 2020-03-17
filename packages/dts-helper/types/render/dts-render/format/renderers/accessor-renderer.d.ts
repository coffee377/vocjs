import { Reflection } from 'typedoc';
import { ReflectionRenderer } from './reflection-renderer';
export default class AccessorRenderer extends ReflectionRenderer {
    render(node: Reflection, terminationCharacter?: string): string;
}
