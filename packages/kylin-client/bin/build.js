#! /usr/bin/env node

const TypeDoc = require('typedoc');
const webpack = require('webpack');
const babelCli = require('../../../node_modules/@babel/cli/lib/babel/dir');
const webpackConfig = require('../webpack.config');

// 1. esm
babelCli
  .default({
    cliOptions: { filenames: ['src'], outDir: 'esm', extensions: '.ts' },
    babelOptions: {
      presets: [
        ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3, modules: false, targets: { node: true } }],
        ['@babel/preset-typescript', {}],
      ],
      plugins: [['@babel/plugin-proposal-class-properties', {}]],
    },
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });

// 2. cjs
babelCli
  .default({
    cliOptions: { filenames: ['src'], outDir: 'lib', extensions: '.ts' },
    babelOptions: {
      presets: [
        ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3, modules: 'commonjs', targets: { node: true } }],
        ['@babel/preset-typescript', {}],
      ],
      plugins: [
        // ['./lib/dts', { a: 'a', b: 2 }],
        ['@babel/plugin-proposal-class-properties', {}],
      ],
    },
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });

// 3. umd
const compiler = webpack(webpackConfig);
compiler.run((err, stats) => {
  if (err) {
    console.log(err);
  }
});

// 4. docs
const app = new TypeDoc.Application();

// If you want TypeDoc to load tsconfig.json / typedoc.json files
app.options.addReader(new TypeDoc.TSConfigReader());
// app.options.addReader(new TypeDoc.TSConfigReader());

app.bootstrap({
  name: 'Kylin Documentation',
  mode: 'file',
  exclude: ['**/node_modules/**'],
  // logger: 'none',
  ignoreCompilerErrors: false,
  includeDeclarations: false,
  hideGenerator: true,
  readme: 'README.md',
  stripInternal: true,
  help: false,
  plugin: ['none', 'typedoc-plugin-typescript-declaration'],
  // declarationFile: 'index2.d.ts',
  // target: 'ES5',
  // module: '',
  // experimentalDecorators: true,
});

const project = app.convert(app.expandInputFiles(['src']));

if (project) {
  // Project may not have converted correctly
  const outputDir = 'docs';

  // Rendered docs
  app.generateDocs(project, outputDir);
  // Alternatively generate JSON output
  app.generateJson(project, `${outputDir}/documentation.json`);
}

// dts
// const dts = require('dts-helper').default;

// dts({}).catch();
