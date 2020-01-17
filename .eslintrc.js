const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  rules: {
    ...strictEslint.rules,
    'max-len': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'react/no-array-index-key': 1,
    'no-plusplus': 0,
    'no-console': 0,
    'no-shadow': 0,
    'dot-notation': 0,
  },
};

