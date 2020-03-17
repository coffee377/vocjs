import { Reflection } from 'typedoc';
import Indent from '../../output/Indent';
import CommentRenderer from './comment-renderer';
import { IRenderer } from '../index';
export declare abstract class ReflectionRenderer implements IRenderer {
    protected indention: Indent;
    protected commentRenderer: CommentRenderer;
    constructor();
    abstract render(node: Reflection, terminationCharacter?: string): string;
    protected getModifiers(node: Reflection, parent?: Reflection): string[];
    protected renderComment(node: Reflection): string;
    protected encodeName(name: string): string;
    protected isTop(node: Reflection): boolean;
    protected getTag(node: Reflection, tag: string): import("typedoc/dist/lib/models").CommentTag;
    protected pushIfTruthy<T>(array: T[], value: T): void;
}
