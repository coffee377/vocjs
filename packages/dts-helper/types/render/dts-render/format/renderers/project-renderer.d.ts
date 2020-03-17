import { Reflection } from 'typedoc/dist/lib/models';
import ContainerRenderer from './container-renderer';
export default class ProjectRenderer extends ContainerRenderer {
    constructor();
    render(node: Reflection): string;
}
