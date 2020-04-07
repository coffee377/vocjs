import { WatchOptions } from 'chokidar';
import { SyncHook } from 'tapable';
interface WatcherHooks {
    add: SyncHook;
    addDir: SyncHook;
    change: SyncHook;
    unlink: SyncHook;
    unlinkDir: SyncHook;
    error: SyncHook;
    ready: SyncHook;
}
interface WatchOpts extends WatchOptions {
    verbose?: boolean;
}
declare class Watcher {
    readonly hooks: WatcherHooks;
    private $watcher;
    private readonly $path;
    private readonly $opts;
    private $isRun;
    constructor(path?: string | string[], options?: WatchOpts);
    start(): boolean;
    stop(): void;
    restart(): void;
    private verbose;
}
export default Watcher;
