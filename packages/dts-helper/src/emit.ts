import fs from 'fs-extra';
import { ProjectReflection } from 'typedoc/dist/lib/models';
import { resolveFileName } from './utils';

export default class Emit {
  private project: ProjectReflection;

  constructor(project: ProjectReflection) {
    this.project = project;
  }

  static of(project: ProjectReflection) {
    return new Emit(project);
  }

  writeSingleFile(baseDir: string, outFile: boolean | string) {
    let path = 'index.d.ts';
    if (typeof outFile === 'string') {
      path = outFile;
      path = path.endsWith('.d.ts') ? path : `${path}.d.ts`;
    }
    console.log(`输出单声明文件${path}`);
    console.log(this.project.files.filter(f => f.name === 'application.d.ts')[0]);

    return this.write(baseDir, path, stream => {
      stream.write('// 输出单声明文件');
    });
  }

  writeMultipleFile(baseDir: string, outDir: string) {
    console.log('输出多声明文件');
    return Promise.resolve();
  }

  private write<T = any>(baseDir: string, fileName: string, callback?: (stream: fs.WriteStream) => void): Promise<T> {
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
}
