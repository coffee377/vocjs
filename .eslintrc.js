const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  rules: {
    ...strictEslint.rules,
    'max-len': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'react/no-array-index-key': 1,
    'import/no-unresolved': [0, { ignore: ['^@/', '^umi/'] }],
    'import/no-named-as-default': 0,
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-console': 0,
    'no-shadow': 0,
    'no-bitwise': 0,
    'no-empty': 0,
    'no-unused-expressions': 0,
    'dot-notation': 0,
    'global-require': 1,
    'class-methods-use-this': 0,
  },
};
