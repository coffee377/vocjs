import doT, { TemplateSettings, templateSettings } from 'dot';

/**
 * @description 代码生成接口
 */
export interface ICode {
  /**
   * @description 函数
   */
  readonly func: Record<string, Function>;

  /**
   * @description Starts sync rendering the code.
   */
  runSync(tpl: string, data: any): string;

  /**
   * @description Starts async rendering the code.
   */
  run(tpl: string, data: any): Promise<string>;
}

export class Code implements ICode {
  readonly options: TemplateSettings;

  readonly func: Record<string, Function>;

  private innerFunc: Record<string, Function> = {
    // camel: (str: string, firstUpper: boolean) => {
    //   let ret = str.toLowerCase();
    //   ret = ret.replace(/_([\w+])/g, (all, letter) => letter.toUpperCase());
    //   if (firstUpper) {
    //     ret = ret.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => $1.toUpperCase() + $2);
    //   }
    //   return ret;
    // },
    // underline: (word: string) => word,
    // upper: (word: string) => word.toLocaleUpperCase(),
    // lower: (word: string) => word.toLocaleLowerCase(),
  };

  runSync = (tpl: string, data: any) => {
    const settings: TemplateSettings = { ...templateSettings, ...this.options };
    const tempFn = doT.template(tpl, settings);
    let resultText = tempFn({ ...data, func: { ...this.innerFunc, ...this.func } });
    // 删除空行
    resultText = resultText.replace(/\n(\n)*( )*(\n)*\n/g, '\n');
    // 单独处理需要空行的情况
    resultText = resultText.replace(/\$blankline/g, '');
    return resultText;
  };

  run = async (tpl: string, data: any) => this.runSync(tpl, data);

  constructor(func?: Record<string, Function>, options?: TemplateSettings) {
    this.func = func;
    this.options = options;
  }
}
