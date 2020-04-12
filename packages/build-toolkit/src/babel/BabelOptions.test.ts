import { DEFAULT_BABEL_OPTIONS } from './index';

test('babel options', () => {
  const opts = DEFAULT_BABEL_OPTIONS;
  // config 配置
  opts.tap(config => ({ ...config, react: true, typescript: true, antd: true }));
  // 或者
  // opts.hook.config.tap('hook-config', config => {
  //   return { ...config, react: true, typescript: false, antd: true };
  // });

  console.log(opts.toString());
});
