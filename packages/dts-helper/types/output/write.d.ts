/// <reference types="node" />
import { WriteStream } from 'fs-extra';
declare abstract class WriteFile {
    protected readonly baseDir?: string;
    protected constructor(baseDir: string);
    protected write<T = any>(fileName: string, callback?: (stream: WriteStream) => void, baseDir?: string): Promise<T>;
    abstract emit(): Promise<any>;
}
export default WriteFile;
