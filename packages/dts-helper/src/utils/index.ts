import path from 'path';
import { propertySorter } from './sort';

function join(delimiter: string, ...values: any[]): string {
  return values.filter(v => v !== null && v !== undefined && v !== '').join(delimiter);
}

function resolveFileName(baseDir: string, fileName: string) {
  return path.resolve(baseDir, fileName);
}

export { join, resolveFileName, propertySorter };
