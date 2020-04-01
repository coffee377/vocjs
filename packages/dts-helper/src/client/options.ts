import { program } from 'commander';

/**
 * @description 命令行版本
 */
const { version } = require('../../package.json');

function collectList(value: string, previous: string[]) {
  return previous.concat(value.split(',').map(s => s.trim()));
}

function lineBreak(value: string, previous: string) {
  switch (value.toUpperCase()) {
    case 'CRLF':
      return '\r\n';
    case 'CR':
      return '\r';
    case 'LF':
    default:
      return '\n';
  }
}

function indentationOperator(value: string, previous: string) {
  // 转大写
  let v = value.toUpperCase();
  // 无数量时默认为1
  if (/^[A-Z]+$/.test(v)) {
    v += '1';
  }
  // 获取缩进符数量
  const numString = v.match(/\d+/g)[0];

  const prefix = v.replace(numString, '');

  let num: number = parseInt(numString, 10);

  if (num === 0) {
    num = 1;
  }
  let result: string;
  switch (prefix) {
    case 'TAB':
      result = '\t'.repeat(num);
      break;
    case 'SPACE':
    default:
      result = ' '.repeat(num);
  }
  return result;
}

function parse(value: string) {
  switch (value.toLowerCase()) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return value;
  }
}

program
  .name('dts')
  .version(version)
  .option('-d, --out-dir <directory>', 'emit output declaration file to the specified directory')
  .option('-f, --out-file [file]', 'concatenate and emit output to single file.', parse, false)
  .option('-m, --module [prefix]', 'specifies the module prefix name.', parse, true)
  .option('-E, --noEmit', 'do not emit output', false)
  .option('-e, --export-equals', 'export Equals', false)
  .option('-C, --no-comment', 'do not emit comments to output', false)
  .option('-V, --verbose', 'display detailed log information', false)
  .option<string[]>('-i, --include <items>', 'specifies the file to include', collectList, [])
  .option<string[]>('-e, --exclude <items>', 'specifies the file to exclude', collectList, [])
  .option('-L, --line-break <CRLF|CR|LF>', 'sets the paragraph newline character', lineBreak)
  .option('-I, --indent <TAB|SPACE>[NUM]', 'sets the line indent,eg TAB(or TAB1)', indentationOperator)
  .usage();

program.parse(process.argv);

export interface CommandOptions {
  version: string;
  outDir: string;
  outFile: boolean | string;
  module: boolean | string;
  noEmit: boolean;
  exportEquals: boolean;
  comment: boolean;
  verbose: boolean;
  include: string[];
  exclude: string[];
  lineBreak: string;
  indent: string;
}

const cmdOpts: CommandOptions = program.opts() as CommandOptions;

export { cmdOpts };
