import { cmdOpts } from './options';
import { IOptions } from '../options';
import { emit } from '../declaration';

const {
  outDir,
  outFile,
  module,
  noEmit,
  exportEquals,
  comment,
  verbose,
  include,
  exclude,
  lineBreak: eol,
  indent,
} = cmdOpts;

const opts: IOptions = {
  exclude,
  include,
  indent,
  noEmit,
  exportEquals,
  outDir,
  outFile,
  modulePrefix: module,
  verbose,
  eol,
  removeComments: !comment || false,
};

emit(opts).catch(err => {
  console.log(err);
  process.exit(1);
});
