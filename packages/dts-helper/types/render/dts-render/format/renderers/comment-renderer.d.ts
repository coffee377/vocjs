import { Reflection } from 'typedoc/dist/lib/models';
import { IRenderer } from '../index';
export default class CommentRenderer implements IRenderer {
    render(node: Reflection): string;
    private renderMultilineComment;
}
