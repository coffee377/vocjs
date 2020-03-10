const Config = require('webpack-chain');
const path = require('path');
// const DemoPlugin = require('./lib/plugin');

const { resolve } = path;
const config = new Config();

config.mode('production');

// 入口配置
config
  // 修改 entry 配置
  .entry('kylin-client')
  .add('./src/index')
  .end();

// 输出配置
config.output
  .path(resolve(__dirname, 'dist'))
  .filename('[name].js')
  .library('kylinClient')
  .globalObject('this')
  .libraryTarget('umd')
  .auxiliaryComment({
    root: 'Root',
    commonjs: 'CommonJS',
    commonjs2: 'CommonJS2',
    amd: 'AMD',
  });

// config.node.set('fs', 'empty').end();

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
            browsers: ['defaults', 'last 2 version', 'Firefox > 60', '> 5%', 'cover 99.5%', 'ie >= 10'],
            // browsers: ['defaults', 'last 2 version', 'Firefox > 60', '> 5%', 'cover 99.5%', 'not ie < 8'],
          },
        },
      ],
      // ['@babel/preset-react',{}],
      ['@babel/preset-typescript', {}],
    ],
    plugins: [['@babel/plugin-proposal-class-properties', {}]],
  });

config.resolve.extensions
  .add('.tsx')
  .add('.ts')
  .add('.jsx')
  .add('.js')
  .end();
// .alias.set('.', resolve(__dirname, 'src'))
// .end();

// config.plugin('declaration').use(DemoPlugin, [{ moduleName: 'kylin-client' }]);

module.exports = config.toConfig();
