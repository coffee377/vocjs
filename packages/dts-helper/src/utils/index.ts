import path from 'path';

export function join(delimiter: string, ...values: any[]): string {
  return values.filter(v => v !== null && v !== undefined && v !== '').join(delimiter);
}

export function resolveFileName(baseDir: string, fileName: string) {
  return path.resolve(baseDir, fileName);
}
