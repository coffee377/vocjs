import MultipleFile from './multiple-file';

class SingleFile extends MultipleFile {
  constructor(fileName: string, content: string, baseDir?: string) {
    super(new Map<string, string>(), baseDir);
    this.files.set(fileName, content);
  }
}

export default SingleFile;
