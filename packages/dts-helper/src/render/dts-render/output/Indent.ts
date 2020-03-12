export default class Indent {
  private readonly indentCache: string[];

  private indentString: string;

  constructor(indentString: string = '  ') {
    this.indentCache = [];
    this.indentString = indentString;
  }

  public getIndent(size: number): string {
    if (size === 0) return '';

    let indent = this.indentCache[size];
    if (indent === undefined) {
      indent = new Array(size).fill(this.indentString).join('');
    }
    return indent;
  }

  private static ins: Indent;

  public static instance(): Indent {
    if (!Indent.ins) {
      Indent.ins = new Indent();
    }
    return Indent.ins;
  }
}
