import { ProjectReflection, SourceFile } from 'typedoc/dist/lib/models';
import { ReflectionFormatter } from '../format';
import SingleFile from '../../../output/single-file';

export default class Emit {
  private readonly project: ProjectReflection;

  constructor(project: ProjectReflection) {
    this.project = project;
  }

  static of(project: ProjectReflection) {
    return new Emit(project);
  }

  writeSingleFile(baseDir: string, outFile: boolean | string = true) {
    if (!this.project) {
      return Promise.reject(new Error('ProjectReflection undefined'));
    }
    if (!outFile) {
      return Promise.resolve();
    }

    let path = 'index.d.ts';
    if (outFile && typeof outFile === 'string') {
      path = outFile;
      path = path.endsWith('.d.ts') ? path : `${path}.d.ts`;
    }

    console.log(`输出单声明文件 => ${path}`);
    const { files } = this.project;

    // 1. 获取 SourceFile
    const sourceFile: SourceFile = files[0];

    // 2. 获取 reflectionGroups
    const reflectionGroups = sourceFile.groups;

    const groups = reflectionGroups.map(g =>
      g.children.map(r => `id => ${r.id}  name => ${r.name} kindString => ${r.kindString}`),
    );

    const formatter = ReflectionFormatter.instance();

    // formatter.render(r);
    // sf.reflections.forEach(r => {
    //   console.log(r);
    // });
    const reflections = sourceFile.reflections.map(r => `id => ${r.id}  name => ${r.name}`);
    const sf = new SingleFile('', '');
    return sf.emit();
    // return SingleFile(baseDir, path, stream => {
    //   stream.write('// 输出单声明文件\n');
    //   stream.write(`declare module '${sourceFile.name}' {\n`);
    //   groups[0].forEach(s => stream.write(`// ${s}\n`));
    //   // reflections.forEach(s => stream.write(`// ${s}\n`));
    //   stream.write(`}\n`);
    // });
  }

  writeMultipleFile(baseDir: string, outDir: string) {
    console.log('输出多声明文件');
    return Promise.reject(new Error('Multi-file declaration output is not implemented!'));
  }
}
