// eslint-disable-next-line import/no-unresolved
import {IBundleOptions, IOpts, Logger} from "./types";

export interface IWebpackOpts extends IOpts{
  cwd: string;
  target: 'browser' | 'node';
  // modules: ModulesType;
  bundleOpts: IBundleOptions;
  watch: boolean;
  log?: Logger;
  rootPath?: string;
}

export default async function(opts: IWebpackOpts){
  return ""
}
