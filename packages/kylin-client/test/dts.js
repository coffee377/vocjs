#! /usr/bin/env node
const dts = require('../lib/generators/emit').default;
const path = require('path');

dts({
  //   // name: 'src',
  //   // main: 'kylin-client',
  // project: path.resolve(__dirname, '../'),
  // baseDir: process.cwd(),
  // verbose: true,
  // externs: ['types/index.d.ts'],
  // types: ['node'],
  outFile: true,
  // outFile:'index'
  // out: 'index.d.ts', // 输出文件
  // target: 99,
  outDir: '',
  // main: 'kylin',
  // prefix: 'demo',
  // files: [],
  // exclude: ['**/*.d.ts', '**/*/client.ts'],
  // sendMessage: msg => console.log(msg),
});

// console.log(process.cwd());
// console.log(path.resolve(process.cwd(), "src"));
// console.log(path.resolve(process.cwd(), "src/test"));
// console.log(path.resolve('D:/vocjs/packages/kylin-client/types/', '../types.d.ts'));
