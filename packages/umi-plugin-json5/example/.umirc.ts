import { IConfig } from 'umi-types';

export default {
  routes: [{ path: '/', component: './index' }],
  plugins: [['umi-plugin-json5', {}]],
} as IConfig;
