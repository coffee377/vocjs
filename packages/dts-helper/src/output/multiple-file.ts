import WriteFile from './write';

class MultipleFile extends WriteFile {
  protected readonly files: Map<string, string>;

  constructor(files: Map<string, string>, baseDir?: string) {
    super(baseDir);
    this.files = files;
  }

  emit(): Promise<any> {
    let result;

    const files = Array.from(this.files);

    // 写文件遇到错误标记
    let hasError: boolean = false;

    // eslint-disable-next-line no-restricted-syntax
    for (const [fileName, content] of files) {
      // TypeError: obj[Symbol.iterator] is not a function
      result = this.write(
        fileName,
        stream => {
          stream.write(content);
        },
        this.baseDir,
        // eslint-disable-next-line no-loop-func
      ).catch(() => {
        hasError = true;
      });

      // 有错误，终止循环
      if (hasError) {
        break;
      }
    }
    return result;
  }
}

export default MultipleFile;
