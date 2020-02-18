import i18next, { i18n } from 'i18next';
import { basename, extname } from 'path';

export interface I18N {
  setDir: (dir: string) => void;
  addResource: (lng: string, resources: any) => void;
  changeLanguage: (lng: string) => void;
  format: (key: string, defaultValue?: string) => string;
}

class I18n implements I18N {
  readonly i18n: i18n;

  private dir: string;

  constructor(dir?: string) {
    this.i18n = i18next.createInstance();
    this.dir = dir || 'locales';
    this.init(dir);
  }

  private init = (dir: string = 'locales') => {
    /* 1.获取国际化目录下资源文件 <lng>.<json|json5|js|ts> */
    const res: string[] = [];

    /* 2.获取语言名称并注册 */
    let lng: string;
    res.forEach(resource => {
      lng = basename(resource).replace(extname(resource), '');
      // eslint-disable-next-line import/no-dynamic-require,global-require
      const resources: any = require(resource);
      this.addResource(lng, resources);
    });
  };

  setDir = (dir: string) => {
    this.dir = dir;
  };

  addResource = (lng: string, resources: any) => {
    this.i18n.addResourceBundle(lng, 'root', resources, true, true);
  };

  changeLanguage = (lng: string) => {
    this.i18n
      .changeLanguage(lng)
      .then(() => {})
      .catch(e => {
        console.error(e);
      });
  };

  format = (key: string, defaultValue?: string) => this.i18n.t(key, defaultValue);
}

export default I18n;
