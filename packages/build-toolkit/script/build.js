require('@babel/register')({
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3, modules: 'cjs', targets: { node: true } }],
    ['@babel/preset-typescript', {}],
  ],
  plugins: [['@babel/plugin-proposal-class-properties', {}]],
  extensions: ['.js', '.ts'],
  cache: false,
  babelrc: false,
  // only: ['**/chain/*.ts'],
});

const { Babel } = require('../src/babel');

const babel = new Babel({ dest: 'lib' });

// cjs
babel.hook.options.tap('opts', opts => {
  opts.tap(config => {
    return { ...config, typescript: true };
  });
  opts.preset('env').tap(options => ({
    ...options,
    modules: 'cjs',
  }));
  opts
    // .minified(true)
    .comments(false)
    .end();
});
babel.run().then(r => {});
