import ts from 'typescript';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as glob from 'glob';
import { IOptions } from './options';

const slash = (path: string) => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path); // eslint-disable-line no-control-regex

  if (isExtendedLengthPath || hasNonAscii) {
    return path;
  }

  return path.replace(/\\/g, '/');
};

const getError: (diagnostics: ts.Diagnostic[]) => Error = diagnostics => {
  let message = 'Declaration generation failed';

  diagnostics.forEach(diagnostic => {
    // not all errors have an associated file: in particular, problems with a
    // the tsconfig.json don't; the messageText is enough to diagnose in those
    // cases.
    if (diagnostic.file) {
      const sourceFile = diagnostic.file as ts.SourceFile;
      const position = sourceFile.getLineAndCharacterOfPosition(diagnostic.start) as ts.LineAndCharacter;

      message +=
        `\n${diagnostic.file.fileName}(${position.line + 1},${position.character + 1}): ` +
        `error TS${diagnostic.code}: ${diagnostic.messageText}`;
    } else {
      message += `\nError TS${diagnostic.code}: ${diagnostic.messageText}`;
    }
  });

  const error = new Error(message);
  error.name = 'EmitterError';
  return error;
};

export type TSConfig = [string[], ts.CompilerOptions];

const merge = (compilerOptions: ts.CompilerOptions, opts: IOptions) => {
  const { outDir, outFile, noEmit } = opts;
  compilerOptions.declaration = true;
  compilerOptions.based = compilerOptions.target || ts.ScriptTarget.Latest; // is this necessary?
  compilerOptions.target = compilerOptions.target || ts.ScriptTarget.Latest; // is this necessary?
  compilerOptions.moduleResolution = compilerOptions.moduleResolution || ts.ModuleResolutionKind.NodeJs;
  compilerOptions.declarationDir = compilerOptions.declarationDir || outDir || 'types';
  // let out = 'index.d.ts';
  // if (outFile && typeof outFile === 'string') {
  //   out = String(outFile);
  // }
  // if (outFile) {
  //   compilerOptions.outFile = compilerOptions.outFile || out;
  // }
  compilerOptions.noEmit = compilerOptions.noEmit || noEmit;
};

/**
 *
 * @param tsconfigFileName fileName The path to the file
 * @param options fileName The path to the file
 */
function getTSConfig(tsconfigFileName: string, options: IOptions): TSConfig {
  const fileName = tsconfigFileName;
  const configText = fs.readFileSync(fileName, { encoding: 'utf8' });
  const result = ts.parseConfigFileTextToJson(fileName, configText);

  if (result.error) {
    throw getError([result.error as ts.Diagnostic]);
  }

  const configParseResult = ts.parseJsonConfigFileContent(
    result.config,
    ts.sys,
    path.dirname(fileName),
  ) as ts.ParsedCommandLine;

  if (configParseResult.errors && configParseResult.errors.length) {
    throw getError(configParseResult.errors);
  }
  merge(configParseResult.options, options);

  const excludesMap: { [filename: string]: boolean } = {};
  const { exclude, baseDir } = options;

  exclude.forEach(fileName => {
    glob.sync(fileName, { cwd: baseDir }).forEach(globFileName => {
      excludesMap[slash(path.resolve(baseDir, globFileName))] = true;
    });
  });

  const fileNames = configParseResult.fileNames.filter(fileName => excludesMap[fileName] !== true);

  return [fileNames, configParseResult.options];
}

function getFileNames(baseDir: string, files: string[]): string[] {
  return files.map(fileName => {
    const resolvedFileName = path.resolve(fileName);
    if (resolvedFileName.indexOf(baseDir) === 0) {
      return resolvedFileName;
    }

    return path.resolve(baseDir, fileName);
  });
}

function resolveFileName(baseDir: string, fileName: string) {
  return path.resolve(baseDir, fileName);
}

type WDF<T = void> = (declarationFiles: ts.SourceFile[], opts: IOptions) => Promise<T>;

const writeDeclarationFile: WDF<void> = (declarationFiles, opts) => {
  const { baseDir, outFile, eol, indent } = opts;
  if (outFile) {
    // 输出单声明文件
    let path = 'index.d.ts';
    if (typeof opts.outFile === 'string') {
      path = opts.outFile;
      path = path.endsWith('.d.ts') ? path : `${path}.d.ts`;
    }
    return write(baseDir, path, stream => {
      stream.write(`// 输出单声明文件${eol}`);
      declarationFiles.forEach((sourceFile, index) => {
        const module = resolveModule(sourceFile.fileName, opts);
        const content = sourceFile.text;
        stream.write(`// ${index} ${module.name}${eol}`);
        stream.write(`declare module '${module.name}' {${eol}`);
        stream.write(sourceFile.text);
        // if (index === 1) {
        // console.log(sourceFile.statements[0]);
        // stream.write(sourceFile.statements[0]);
        // stream.write(content);
        // console.log('resolveModule', resolveModule(sourceFile.fileName, opts));
        // }
        stream.write(`}${eol}${eol}`);
      });
    });
  }
  // 输出多声明文件
  const pr = declarationFiles.map(sourceFile =>
    write(baseDir, sourceFile.fileName, stream => {
      stream.write(sourceFile.text);
    }),
  );
  return Promise.resolve();
};

export { getError, getTSConfig, getFileNames, slash, resolveFileName, write, writeDeclarationFile, resolveModule };

function write<T = void>(baseDir: string, fileName: string, callback?: (stream: fs.WriteStream) => void): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // 1. 解析获取完整文件路径
    const outPath = resolveFileName(baseDir, fileName);
    // 2. 确保文件存在
    fs.ensureFileSync(outPath);
    // 3. 创建输出流
    const out = fs.createWriteStream(outPath, { mode: 644 });
    out.on('close', () => {
      resolve();
    });
    out.on('error', reject);
    // 4. copyright

    // 5. 回调
    if (callback) {
      callback(out);
    }
    out.end();
  });
}
interface Module {
  /**
   * @description 当前模块文件名
   */
  fileName: string;

  /**
   * @description 模块 ID
   */
  id: string;

  path: string[];

  /**
   * @description 模块名称
   */
  name: string;

  // importModuleName: (r: string) => string;
}

function resolveModule(dtsFile: string, opts?: IOptions): Module {
  const { outFile, outDir, baseDir, main } = opts;
  const base = slash(resolveFileName(baseDir, outDir));
  const fileName = slash(resolveFileName(baseDir, dtsFile));
  const id = fileName.replace(base, '');
  let path = id
    .split('/')
    .map(s => {
      if (s.endsWith('.d.ts')) {
        return s.replace('.d.ts', '');
      }
      return s;
    })
    .filter(s => s && s.length > 0 && s !== 'index');

  if (outFile) {
    path = [main, ...path];
  }

  const name = path.join('/');

  return {
    fileName,
    id,
    path,
    name,
  };
}
