const Config = require('webpack-chain');
const path = require('path');

const { resolve } = path;
const config = new Config();

config.mode('production');

// 入口配置
config
  // 修改 entry 配置
  .entry('code')
  .add('./src/index')
  .end();

// 输出配置
config.output
  .path(resolve(__dirname, 'dist'))
  .filename('[name].js')
  .library('code')
  .globalObject('this')
  .libraryTarget('umd')
  .auxiliaryComment({
    root: 'Root',
    commonjs: 'CommonJS',
    commonjs2: 'CommonJS2',
    amd: 'AMD',
  });

// 创建一个具名规则，以后用来修改规则
// config.module
//   .rule('lint')
//   .test(/\.js$/)
//   .pre()
//   .include
//   .add('src')
//   .end()
//   // 还可以创建具名use (loaders)
//   .use('eslint')
//   .loader('eslint-loader')
//   .options({
//     rules: {
//       semi: 'off'
//     }
//   });

// config.target('node-webkit');

config.module
  .rule('compile')
  .test(/\.[tj]sx?$/)
  .include.add(/src/)
  .end()
  .exclude.add(/node_modules/)
  .end()
  .use('babel')
  .loader('babel-loader')
  .options({
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          modules: false,
          targets: {
            // node: true,
            browsers: ['defaults', 'last 2 version', 'Firefox > 60', '> 5%', 'cover 99.5%', 'not ie < 8'],
          },
        },
      ],
      // ['@babel/preset-react',{}],
      ['@babel/preset-typescript', {}],
    ],
    plugins: [['@babel/plugin-proposal-class-properties', {}]],
  });

// 也可以创建一个具名的插件!
// config
//   .plugin('clean')
//   .use(CleanPlugin, [['dist'], { root: '/dir' }]);

config.resolve.extensions
  .add('.tsx')
  .add('.ts')
  .add('.jsx')
  .add('.js')
  .end();
// .alias.set('.', resolve(__dirname, 'src'))
// .end();

module.exports = config.toConfig();
