import vfs, { DestOptions, SrcOptions } from 'vinyl-fs';
import through from 'through2';
import { TransformOptions } from '@babel/core';
import { AsyncSeriesHook, SyncHook, SyncWaterfallHook } from 'tapable';
import filter from 'gulp-filter';
import transform from './transform';
import { withExtension } from '../utils';
import Stats from './Stats';
import DefaultBabelOptions from './DefaultOptions';
import BabelOptions, { IBabelConfig } from './BabelOptions';

export interface CompileOptions extends IBabelConfig {
  cwd?: string;
  src?: string;
  dest?: string;
  exclude?: string[];
  verbose?: boolean;
  watch?: boolean;
}

export interface IWriteOptions {
  globs: string | string[];
  destFolder: string;
  srcOpts?: SrcOptions;
  destOpts?: DestOptions;
}

/**
 * 输出编译文件
 * @param opts
 * @param babelOpts
 * @param ext
 */
const write = async (opts: IWriteOptions, babelOpts?: TransformOptions, ext?: string): Promise<Error> => {
  const { globs, srcOpts, destFolder, destOpts } = opts;
  try {
    vfs
      .src(globs, srcOpts)
      .pipe(filter(file => !file.path.match(/\.(spec|test)\.[jt]sx?$/)))
      .pipe(
        through.obj((file, enc, callback) => {
          const result = transform(file, babelOpts);
          if (result !== null) {
            file.path = withExtension(file.path, ext);
            file.contents = Buffer.from(result.code);
            callback(null, file);
          } else {
            callback(null, null);
          }
        }),
      )
      .pipe(vfs.dest(destFolder, destOpts));
  } catch (e) {
    return e;
  }
  return null;
};

interface CompilerHook {
  initialize: SyncHook;
  options: SyncWaterfallHook<BabelOptions>;
  done: SyncHook<Stats>;
  afterDone: SyncHook<Stats>;
  failed: SyncHook<Error>;
}

class Compiler {
  readonly hook: CompilerHook;

  running: boolean;

  watchMode: boolean;

  private readonly compilerOptions: CompileOptions;

  options: BabelOptions;

  constructor(opts?: CompileOptions) {
    this.hook = Object.freeze({
      initialize: new SyncHook([]),
      options: new SyncWaterfallHook(['Options']),
      done: new AsyncSeriesHook(['stats']),
      afterDone: new SyncHook(['stats']),
      failed: new SyncHook(['error']),
    });
    this.running = false;
    this.watchMode = false;
    this.compilerOptions = { ...opts };
    this.hook.options.tap('init-config', options => {
      options.tap(config => ({ ...config, ...this.compilerOptions }));
      return options;
    });
  }

  async run() {
    const stats = new Stats();
    stats.startTime = Date.now();

    if (this.running) {
      stats.errors.push(new Error('Each instance only supports a single concurrent compilation at a time.'));
    }

    const finalCallback = (err: Error, stats: Stats) => {
      this.running = false;
      if (err) {
        this.hook.failed.call(err);
      }
      this.hook.afterDone.call(stats);
    };

    this.running = true;

    const { cwd, src, dest, exclude } = this.compilerOptions;

    const writeOpts: IWriteOptions = {
      globs: src || 'src/**/*',
      destFolder: dest || 'es',
      srcOpts: { allowEmpty: true, cwd, ignore: exclude || [] },
      destOpts: { cwd },
    };
    this.registerBabelOptions();

    if (this.compilerOptions.verbose) {
      console.log(this.options.toString());
    }
    const err = await write(writeOpts, this.options.toConfig(), '.js');
    if (err) stats.errors.push(err);

    stats.endTime = Date.now();
    finalCallback(err, stats);

    return stats;
  }

  private registerBabelOptions() {
    this.options = this.hook.options.call(DefaultBabelOptions);
  }

  async watch() {
    // if (this.running) {
    //   // return handler(new ConcurrentCompilationError());
    // }
    //
    // this.running = true;
    // this.watchMode = true;
    // return new Watching(this, watchOptions, handler);
  }
}

export { write, Compiler };

export default Compiler;
