import { DeclarationFile } from './source';
import MultipleFile from '../output/multiple-file';

function multiple(declarationFiles: DeclarationFile[], baseDir?: string) {
  const fileMap: Map<string, string> = new Map<string, string>();
  declarationFiles.forEach(file => {
    const { fileName, contents } = file;
    fileMap.set(fileName, contents);
  });

  const mf = new MultipleFile(fileMap, baseDir);
  return mf.emit();
}

export default multiple;
