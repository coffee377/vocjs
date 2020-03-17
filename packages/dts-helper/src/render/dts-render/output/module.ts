export interface Module {
  /**
   * @description 模块 ID
   */
  id: string;

  /**
   * @description 当前模块文件名
   */
  fileName: string;

  /**
   * @description 模块路径
   */
  path: string[];

  /**
   * @description 模块名称
   */
  name: string;

  // importModuleName: (r: string) => string;
}

class ModuleResolve {
  /**
   * @description 当前模块文件名
   */
  fileName: string;

  /**
   * @description 模块 ID
   */
  id: string;

  path: string[];

  /**
   * @description 模块名称
   */
  name: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  run(): Module {
    return { fileName: '', id: '', name: '', path: [] };
  }

}
