import chalk from 'chalk';
import fork from '../utils/fork';
import { ClientOptions } from './options';

const opts: ClientOptions = {};

(async () => {
  try {
    if (opts.type === 'dev') {
      const child = fork({
        scriptPath: require.resolve('./forkedDev'),
      });
      process.on('SIGINT', () => {
        child.kill('SIGINT');
      });
      process.on('SIGTERM', () => {
        child.kill('SIGTERM');
      });
    } else {
    }
  } catch (e) {
    console.error(chalk.red(e.message));
    console.error(e.stack);
    process.exit(1);
  }
})();
