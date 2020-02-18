import { join, extname } from 'path';
import chalk from 'chalk';
import rimraf from 'rimraf';
import { transform as babelTransform, TransformOptions } from '@babel/core';
import vinyl, { BufferFile } from 'vinyl';
import vfs from 'vinyl-fs';
import babel from 'gulp-babel';
import through from 'through2';
import { getTargetPath } from './utils';
// eslint-disable-next-line import/no-unresolved
import { IBundleOptions, IOpts, Logger } from './types';
import getBabelTransformConfig from './getBabelTransformConfig';

export interface IBabelOpts extends IOpts {
  cwd: string;
  target: 'browser' | 'node';
  bundleOpts: IBundleOptions;
  watch: boolean;
  log?: Logger;
  rootPath?: string;
}

interface ITransformOpts {
  file: {
    contents: string;
    path: string;
  };
  babelTransformOptions: TransformOptions;
}

/**
 * 代码编译转换
 * @param opts
 */
const transform = (opts: ITransformOpts) => {
  const { file, babelTransformOptions } = opts;
  return babelTransform(file.contents, {
    ...babelTransformOptions,
    filename: file.path,
    babelrc: false,
  }).code;
};

const createStream = (glob: string, srcPath: string, targetPath: string) => {
  const tsConfig = {};
  vfs
    .src(glob, { allowEmpty: true, base: srcPath, cwdbase: true })
    .pipe(babel({ minified: true }))
    .pipe(
      through.obj((file, enc, callback) => {
        file.contents = Buffer.from(transform({ babelTransformOptions: {}, file }));
        file.path = file.path.replace(extname(file.path), '.js');
        callback(null, file);
      }),
    )
    .pipe(vfs.dest(targetPath));
};

export default async function(opts: IBabelOpts) {
  const { cwd, modules, target, rootPath, log, bundleOpts } = opts;
  const srcPath = join(cwd, 'src');

  const { cjs } = bundleOpts;
  const to: TransformOptions = getBabelTransformConfig({ modules, target, minified: true, comments: false });

  /* 1.删除已生成文件目录 */
  const targetPath = getTargetPath(cwd, modules);
  log(chalk.gray(`Clean ${targetPath} directory`));
  rimraf.sync(targetPath);

  /**/
  return new Promise(e => {});
}
