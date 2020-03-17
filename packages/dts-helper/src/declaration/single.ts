import { DeclarationSourceFile } from './source';
import SingleFile from '../output/single-file';

function single(declarationFile: DeclarationSourceFile, baseDir?: string) {
  // 3.修改导入导出模块名称
  const { fileName, text } = declarationFile;
  // TODO

  // 4.输出内容
  const contents = text;

  const sf = new SingleFile(fileName, contents, baseDir);
  return sf.emit();
}

export default single;
