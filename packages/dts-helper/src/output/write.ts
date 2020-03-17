import { createWriteStream, ensureFileSync, WriteStream } from 'fs-extra';
import { resolveFileName } from '../utils';

abstract class WriteFile {
  protected readonly baseDir?: string;

  protected constructor(baseDir: string) {
    this.baseDir = baseDir;
  }

  protected write<T = any>(fileName: string, callback?: (stream: WriteStream) => void, baseDir?: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // 1. 解析获取完整文件路径
      const outPath = resolveFileName(fileName, baseDir);
      // 2. 确保文件存在
      ensureFileSync(outPath);
      // 3. 创建输出流
      const out = createWriteStream(outPath, { mode: 644 });
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

  abstract emit(): Promise<any>;
}

export default WriteFile;
