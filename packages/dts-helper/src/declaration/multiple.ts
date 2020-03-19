import { DeclarationFile } from './source';
import MultipleFile from '../output/multiple-file';

function multiple(declarationFiles: DeclarationFile[], baseDir?: string) {
  const files = declarationFiles.map(file => [file.fileName, file.contents]);

  const fileMap: Map<string, string> = new Map<string, string>(files);

  const mf = new MultipleFile(fileMap, baseDir);
  return mf.emit();
}

export default multiple;
