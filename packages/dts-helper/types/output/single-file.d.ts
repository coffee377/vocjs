import MultipleFile from './multiple-file';
declare class SingleFile extends MultipleFile {
    constructor(fileName: string, content: string, baseDir?: string);
}
export default SingleFile;
