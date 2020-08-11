import { TransformOptions } from '@babel/core';

export interface CliOptions {
  filename?: string;
  filenames?: string[];
  extensions?: string[];
  keepFileExtension?: string;
  outFileExtension?: string;
  watch?: boolean;
  skipInitialBuild?: boolean;
  outFile?: string;
  outDir?: string;
  relative?: boolean;
  copyFiles?: boolean;
  copyIgnored?: boolean;
  includeDotfiles?: boolean;
  verbose?: boolean;
  quiet?: boolean;
  deleteDirOnStart?: boolean;
  sourceMapTarget?: string;
}

export type CmdOptions = {
  babelOptions: TransformOptions;
  cliOptions: CliOptions;
};
