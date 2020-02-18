// eslint-disable-next-line import/no-unresolved
import { IBundleOptions } from './types';
import { getExistFile } from './utils';

export const CONFIG_FILES = ['tools.config.js', 'tools.config.jsx', 'tools.config.ts', 'tools.config.tsx'];

const Default = (obj: object) => obj.default || obj;

export default function(cwd: string): IBundleOptions[] {
  const configFile = getExistFile({
    cwd,
    files: CONFIG_FILES,
    relative: false,
  });

  if (configFile) {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const userConfig = Default(require(configFile));
    const userConfigs = Array.isArray(userConfig) ? userConfig : [userConfig];
    userConfigs.forEach(c => {
      // todo 配置校验
    });
    return userConfigs;
  }
  return [];
}
