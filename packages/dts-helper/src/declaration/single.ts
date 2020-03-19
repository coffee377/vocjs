import { DeclarationFile } from './source';
import SingleFile from '../output/single-file';

function single(declarationFile: DeclarationFile, baseDir?: string) {
  const { fileName, contents } = declarationFile;

  const sf = new SingleFile(fileName, contents, baseDir);
  return sf.emit();
}

export default single;
