const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  rules: {
    ...strictEslint.rules,
    'max-len': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'react/no-array-index-key': 1,
    'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
    'import/no-extraneous-dependencies': 1,
    'no-plusplus': 0,
    'no-console': 0,
    'no-shadow': 0,
    'no-empty': 0,
    'dot-notation': 0,
    'global-require': 1,
  },
};
