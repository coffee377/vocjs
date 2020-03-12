import { Application } from 'typedoc';
import { ProjectReflection } from 'typedoc/dist/lib/models';

export class DtsApplication extends Application {

  /**
   * 输出声明文件
   * @param project
   * @param out 输出文件或输出目录
   */
  generateDts(project: ProjectReflection, out?: string) {
    return false;
  }

}
