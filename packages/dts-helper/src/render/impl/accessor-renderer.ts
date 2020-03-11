import { DeclarationReflection, Reflection } from 'typedoc';
import ReflectionRenderer from '../reflection-renderer';
import { join } from '../../utils';
import ReflectionFormatter from '../reflection-formatter';

export default class AccessorRenderer extends ReflectionRenderer {
  render(node: Reflection, terminationCharacter?: string): string {
    const method = node as DeclarationReflection;
    return join(
      '\n',
      ReflectionFormatter.instance().render(method.getSignature!, terminationCharacter),
      ReflectionFormatter.instance().render(method.setSignature!, terminationCharacter),
    );
  }
}
