import path from 'path';
import { propertySorter } from './sort';

const slash = (path: string) => {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path); // eslint-disable-line no-control-regex

  if (isExtendedLengthPath || hasNonAscii) {
    return path;
  }

  return path.replace(/\\/g, '/');
};

function join(delimiter: string, ...values: any[]): string {
  return values.filter(v => v !== null && v !== undefined && v !== '').join(delimiter);
}

function resolveFileName(baseDir: string, fileName: string) {
  return path.resolve(baseDir, fileName);
}

export { slash, join, resolveFileName, propertySorter };
