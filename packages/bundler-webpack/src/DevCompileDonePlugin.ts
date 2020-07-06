import webpack, { Plugin } from 'webpack';

export interface Options {
  port: number;
}

class DevCompileDonePlugin extends Plugin {
  opts: Options;

  constructor(opts: Options) {
    super();
    this.opts = opts;
  }

  apply(compiler: webpack.Compiler) {
    let isFirstCompile = true;
    compiler.hooks.done.tap('DevFirstCompileDone', (stats) => {
      if (stats.hasErrors()) {
        // make sound
        if (process.env.SYSTEM_BELL !== 'none') {
          process.stdout.write('\x07');
        }
        return;
      }
      console.log(`App running at: http://localhost:${this.opts.port}`);
      if (isFirstCompile) {
        process.send?.({ type: 'DONE' });
        isFirstCompile = false;
      }
    });
    super.apply(compiler);
  }
}

export default DevCompileDonePlugin;
