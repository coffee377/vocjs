export default class Indent {
    private readonly indentCache;
    private indentString;
    constructor(indentString?: string);
    getIndent(size: number): string;
    private static ins;
    static instance(): Indent;
}
