import Options from './Options';

const opts = new Options<any>({});

const { react, typescript, antd } = opts.config;

opts
  .preset('env')
  .order(1)
  .use('@babel/preset-env', { useBuiltIns: 'usage', corejs: 3, modules: false })
  .end();
opts
  .preset('react')
  .order(2)
  .when(
    react,
    truthy => truthy.use('@babel/preset-react', {}),
    falsy => falsy.useless(),
  )
  .end();
opts
  .preset('typescript')
  .order(3)
  .when(typescript, truthy => {
    truthy.use('@babel/preset-typescript', {});
  })
  .end();

opts
  .plugin('proposal-export-default-from')
  .order(2)
  .use('@babel/plugin-proposal-export-default-from', {});
opts
  .plugin('proposal-export-namespace-from')
  .order(3)
  .use('@babel/plugin-proposal-export-namespace-from', {});
opts
  .plugin('proposal-do-expressions')
  .order(4)
  .use('@babel/plugin-proposal-do-expressions', {});
opts
  .plugin('proposal-optional-chaining')
  .order(5)
  .use('@babel/plugin-proposal-optional-chaining', {});
opts
  .plugin('proposal-decorators')
  .order(6)
  .use('@babel/plugin-proposal-decorators', { legacy: true });
opts
  .plugin('class-properties')
  .order(7)
  .use('@babel/plugin-proposal-class-properties', { loose: true });
opts
  .plugin('transform-runtime')
  .order(8)
  .use('@babel/plugin-transform-runtime', {});
opts
  .plugin('babel-plugin-import')
  .order(9)
  .when(antd, truthy =>
    truthy.use('babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'lib', // default: lib
      style: true,
    }),
  );

export default opts;
