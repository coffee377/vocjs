import { Application } from 'typedoc';

interface DtsOptions {
  baseDir?: string;
  outFile?: boolean | string;
  outDir?: string;
  // sorOption: ReflectionSortFlags;
}

export class DtsApplication extends Application {}
