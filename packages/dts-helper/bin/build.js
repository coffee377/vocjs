#! /usr/bin/env node

const TypeDoc = require('typedoc');

// 4. docs
const app = new TypeDoc.Application();

// If you want TypeDoc to load tsconfig.json / typedoc.json files
app.options.addReader(new TypeDoc.TSConfigReader());
// app.options.addReader(new TypeDoc.TSConfigReader());

const result = app.bootstrap({
  // name: 'Kylin Documentation',
  mode: 'file',
  exclude: ['**/node_modules/**/*.ts'],
  // logger: 'none',
  // declarationFile: 'main.d.ts',
  // declarationDir: 'test',
  ignoreCompilerErrors: false,
  includeDeclarations: false,
  hideGenerator: true,
  readme: 'README.md',
  stripInternal: true,
  help: false,
  plugin: ['none'],
  // plugin: ['D:\\vocjs\\packages\\dts-helper\\plugin\\index.js'],
  // declarationFile: 'index2.d.ts',
  // target: 'ES5',
  // module: '',
  // experimentalDecorators: true,
});

// console.log('inputFiles', result.inputFiles);
// console.log(app.options.getRawValues());
// console.log(app.expandInputFiles(['src']));

// const pluginHost = app.plugins.load();
const project = app.convert(app.expandInputFiles(['src']));
// const project = app.convert(result.inputFiles);

if (project) {
  // Project may not have converted correctly
  const outputDir = 'docs';

  // Rendered docs
  app.generateDocs(project, outputDir);
  // Alternatively generate JSON output
  // app.generateJson(project, `${outputDir}/documentation.json`);
}
