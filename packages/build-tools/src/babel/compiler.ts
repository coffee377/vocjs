import vfs, { DestOptions, SrcOptions } from 'vinyl-fs';
import through from 'through2';
import { extname } from 'path';
import { TransformOptions } from '@babel/core';
import chokidar from 'chokidar';
import transform from './transform';
import { getBabelTransformOptions, IBabelConfigOpts } from './getBabelConfig';
import { getDestFolder } from '../utils';

interface CompileOptions extends IBabelConfigOpts {
  cwd?: string;
  src?: string;
  dest?: string;
  exclude?: string[];
  watch?: boolean;
}

export interface IWriteOptions extends IBabelConfigOpts {
  globs: string | string[];
  destFolder: string;
  srcOpts?: SrcOptions;
  destOpts?: DestOptions;
  babelOpts?: TransformOptions;
}

/**
 * 输出编译文件
 */
const write = async (opts: IWriteOptions) => {
  const { globs, srcOpts, destFolder, destOpts, babelOpts } = opts;
  const babelTransformOptions = babelOpts || getBabelTransformOptions(opts);
  try {
    vfs
      .src(globs, srcOpts)
      .pipe(
        through.obj((file, enc, callback) => {
          const result = transform({ file, babelTransformOptions });
          if (result !== null) {
            file.contents = Buffer.from(result.code);
            file.path = file.path.replace(extname(file.path), '.js');
            callback(null, file);
          } else {
            callback(null, null);
          }
        }),
      )
      .pipe(vfs.dest(destFolder, destOpts));
  } catch (e) {
    return Promise.reject(e);
  }
  return Promise.resolve();
};

const handleFile = () => {};

const runWatcher = async (): Promise<any> => {
  // filenames.forEach(filenameOrDir => {
  //   const watcher = chokidar.watch(filenameOrDir, {
  //     persistent: true,
  //     ignoreInitial: true,
  //     awaitWriteFinish: {
  //       stabilityThreshold: 50,
  //       pollInterval: 10,
  //     },
  //   });
  //
  //   ['add', 'change'].forEach(type => {
  //     watcher.on(type, filename => {
  //       console.log(filename);
  //       // handleFile(filename, filename === filenameOrDir ? path.dirname(filenameOrDir) : filenameOrDir).catch(err => {
  //       //   console.error(err);
  //       // });
  //     });
  //   });
  // });}
  return '';
};
const compiler = async (opts: CompileOptions) => {
  const { cwd, watch, src, dest, exclude } = opts;
  if (watch) {
    return runWatcher();
  }
  const w: IWriteOptions = {
    globs: src || 'src/**/*',
    destFolder: dest || 'dist',
    srcOpts: { allowEmpty: true, cwd, ignore: exclude || [] },
    destOpts: { cwd },
  };
  return write(w);
};

export { write, compiler };
