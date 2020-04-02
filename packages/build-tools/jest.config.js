module.exports = {
  clearMocks: true,

  testEnvironment: 'node',

  transform: {
    '\\.[t|j]sx?$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3, modules: 'cjs', targets: { node: true } }],
          ['@babel/preset-typescript', {}],
        ],
        plugins: [['@babel/plugin-proposal-class-properties', {}]],
      },
    ],
  },
};
