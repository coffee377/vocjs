import { ModulesType } from "../types";
declare const getDestFolder: (modules: ModulesType) => string;
export interface FileOpts {
    cwd: string;
    files: string[];
    relative: boolean;
}
export declare const getExistFile: (fileOpts: FileOpts) => string | false;
export declare const isTypescript: (filePath: any) => any;
declare const withExtension: (filename: string, ext?: string) => string;
export { getDestFolder, withExtension };
