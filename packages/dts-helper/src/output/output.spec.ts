import SingleFile from './single-file';
import MultipleFile from './multiple-file';

describe('write single file', () => {
  test('fileName is empry', () => {
    expect.assertions(1);
    const sf = new SingleFile(undefined,undefined);
    return expect(sf.emit()).rejects.toThrow('The file name cannot be empty');
  });

  test('without baseDir', () => {
    const sf = new SingleFile('test.ts', '// test without baseDir');
    sf.emit();
    // expect(sf.emit()).rejects.match()
  });

  test('with baseDir', () => {
    const sf = new SingleFile('test.ts', '// test with baseDir', __dirname);
    sf.emit();
    // expect(sf.emit()).rejects.match()
  });
});

describe('write mutiple file', () => {
  const files: Map<string, string> = new Map<string, string>();
  files.set('file1.ts', '// file 1');
  files.set('1/file2.ts', '// file 2');
  files.set('1/2/file3.ts', '// file 3');

  test('without baseDir', () => {
    const mf = new MultipleFile(files);
    mf.emit();
    // expect(sf.emit()).rejects.match()
  });

  test('with baseDir', () => {
    const mf = new MultipleFile(files, __dirname);
    mf.emit();
    // expect(sf.emit()).rejects.match()
  });
});
