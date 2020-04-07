/// <reference types="node" />
interface IOpts {
    scriptPath: string;
}
declare function start({ scriptPath }: IOpts): import("child_process").ChildProcess;
export default start;
