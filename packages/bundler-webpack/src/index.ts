import { IConfig, BundlerConfigType } from '@vocjs/types';
import webpack, { Configuration, MultiCompiler, Stats } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
// import { IServerOpts, Server } from '@umijs/server';
import getConfig, { IOpts as IGetConfigOpts } from './config';

interface IConfig {}

interface IOpts {
  cwd: string;
  config: IConfig;
}

class WebpackBundler {
  static id = 'webpack';

  static version = 4;

  cwd: string;

  config: IConfig;

  constructor({ cwd, config }: IOpts) {
    this.cwd = cwd;
    this.config = config;
  }

  async getConfig(opts: Omit<IGetConfigOpts, 'cwd' | 'config'>): Promise<Configuration> {
    return getConfig({
      ...opts,
      cwd: this.cwd,
      config: this.config,
    });
  }

  async build({
    bundleConfigs,
    bundleImplementor = webpack,
  }: {
    bundleConfigs: Configuration[];
    bundleImplementor?: (options: Configuration[]) => MultiCompiler;
  }): Promise<{ stats: Stats }> {
    return new Promise((resolve, reject) => {
      const compiler = bundleImplementor(bundleConfigs);
      compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
          // try {
          // console.log(stats.toString('errors-only'));
          // } catch (e) {}
          // console.error(err);
          reject(new Error('build failed'));
        }
        resolve({ stats });
      });
    });
  }

  async dev({
    bundleConfigs,
    bundleImplementor = webpack,
  }: {
    bundleConfigs: Configuration[];
    bundleImplementor?: (options: Configuration[]) => MultiCompiler;
  }) {
    const compiler = bundleImplementor(bundleConfigs);
    const devConfigs = bundleConfigs.map((item) => item.devServer);
    const devConfig = devConfigs[0];
    const devServer = new WebpackDevServer(compiler, {
      ...devConfig,
    });
    devServer.listen(devConfig.port, devConfig.host, () => {});
  }
}

export { WebpackBundler, BundlerConfigType, webpack };
