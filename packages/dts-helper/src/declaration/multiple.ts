import { DeclarationSourceFile } from './source';
import MultipleFile from '../output/multiple-file';

function multiple(declarationFiles: DeclarationSourceFile[], baseDir?: string) {
  const fileMap: Map<string, string> = new Map<string, string>();

  declarationFiles.forEach(file => {
    fileMap.set(file.fileName, file.text);
  });

  const mf = new MultipleFile(fileMap, baseDir);
  return mf.emit();
}

export default multiple;
