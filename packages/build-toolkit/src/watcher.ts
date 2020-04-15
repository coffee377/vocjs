// import chokidar, { FSWatcher, WatchOptions } from 'chokidar';
// import { SyncHook } from 'tapable';
//
// interface WatcherHooks {
//   add: SyncHook; // 新增文件时
//   addDir: SyncHook; // 新增目录时
//   change: SyncHook; // 文件改变时
//   unlink: SyncHook; // 删除文件时
//   unlinkDir: SyncHook; // 删除目录时
//   error: SyncHook; // 出错时
//   ready: SyncHook; // 准备就绪
// }
//
// interface WatchOpts extends WatchOptions {
//   verbose?: boolean;
// }
//
// class Watcher {
//   readonly hooks: WatcherHooks;
//
//   private $watcher: FSWatcher;
//
//   private readonly $path: string | string[];
//
//   private readonly $opts: WatchOpts;
//
//   private $isRun: boolean = false;
//
//   constructor(path?: string | string[], options?: WatchOpts) {
//     this.$isRun = false;
//     this.$path = path || 'src';
//     this.$opts = {
//       persistent: true,
//       ignoreInitial: true,
//       awaitWriteFinish: {
//         stabilityThreshold: 50,
//         pollInterval: 10,
//       },
//       verbose: false,
//       ...options,
//     };
//     this.hooks = {
//       add: new SyncHook<string, any, any>(['path']),
//       addDir: new SyncHook<string, any, any>(['path']),
//       change: new SyncHook<string, any, any>(['path']),
//       unlink: new SyncHook<string, any, any>(['path']),
//       unlinkDir: new SyncHook<string, any, any>(['path']),
//       error: new SyncHook<Error, any, any>(['error']),
//       ready: new SyncHook<string, any, any>(['path']),
//     };
//     this.verbose();
//   }
//
//   start() {
//     if (!this.$isRun) {
//       this.$watcher = chokidar
//         .watch(this.$path, this.$opts)
//         // 新增文件时
//         .on('add', path => this.hooks.add.call(path))
//         // 新增目录时
//         .on('addDir', path => this.hooks.addDir.call(path))
//         // 文件改变时
//         .on('change', path => this.hooks.change.call(path))
//         // 删除文件时
//         .on('unlink', path => this.hooks.unlink.call(path))
//         // 删除目录时
//         .on('unlinkDir', path => this.hooks.unlinkDir.call(path))
//         // 出错时
//         .on('error', error => {
//           this.$isRun = false;
//           this.hooks.error.call(error);
//         })
//         // 准备就绪
//         .on('ready', () => this.hooks.ready.call());
//       this.$isRun = true;
//     }
//     return this.$isRun;
//   }
//
//   stop() {
//     if (this.$isRun) {
//       this.$watcher.unwatch(this.$path);
//     }
//   }
//
//   restart() {
//     this.stop();
//     this.start();
//   }
//
//   private verbose() {
//     if (this.$opts?.verbose) {
//       this.hooks.add.tap('addVerbose', path => console.log(`File [${path}] has been added`));
//       this.hooks.addDir.tap('addDirVerbose', path => console.log(`Directory ${path} has been added`));
//       this.hooks.change.tap('changeVerbose', path => console.log(`File ${path} has been changed`));
//       this.hooks.unlink.tap('unlinkVerbose', path => console.log(`File ${path} has been removed`));
//       this.hooks.unlinkDir.tap('unlinkDirVerbose', path => console.log(`Directory ${path} has been removed`));
//       this.hooks.error.tap('errorVerbose', error => console.log(`Watcher error: ${error}`));
//       this.hooks.ready.tap('readyVerbose', () => console.log(`Initial scan complete. Ready for changes`));
//     }
//   }
// }
//
// export default Watcher;
