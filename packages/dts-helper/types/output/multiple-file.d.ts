import WriteFile from './write';
declare class MultipleFile extends WriteFile {
    protected readonly files: Map<string, string>;
    constructor(files: Map<string, string>, baseDir?: string);
    emit(): Promise<any>;
}
export default MultipleFile;
