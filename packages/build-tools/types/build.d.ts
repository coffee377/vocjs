import { BundleTool, IBundleOptions } from "./types";
import { IBabelOptions } from "./babel";
export declare const getBundleOpts: (opts: any) => IBundleOptions[];
export declare const compile: (tool: BundleTool, opts: IBabelOptions) => Promise<import("./babel/Stats").default>;
export declare const build: (opts: any) => Promise<void>;
export default function (opts: any): Promise<void>;
