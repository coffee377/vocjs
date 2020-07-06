/* eslint-disable guard-for-in */
import webpack from 'webpack';

const prefixRE = /^VOC_APP_/;

const ENV_SHOULD_PASS = ['NODE_ENV', 'HMR', 'SOCKET_SERVER', 'ERROR_OVERLAY'];

type Definitions = { [key: string]: webpack.DefinePlugin.CodeValueObject };

const defineFn = (definitions: Definitions) => {
  const env = {};
  Object.keys(process.env).forEach((key) => {
    if (prefixRE.test(key) || ENV_SHOULD_PASS.includes(key)) {
      env[key] = process.env[key];
    }
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const key in env) {
    env[key] = JSON.stringify(env[key]);
  }

  const define = {};
  if (definitions) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in definitions) {
      define[key] = JSON.stringify(definitions[key]);
    }
  }

  return {
    'process.env': env,
    ...define,
  };
};

export default defineFn;
