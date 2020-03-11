var baseEslint = require('./.eslintrc.js');

module.exports = Object.assign(baseEslint, {
  rules: {
    ...baseEslint.rules,
    semi: 1,
    'no-empty': 1,
    'no-unreachable': 1,
    'prefer-destructuring': 1,
    'prefer-template': 1,
    'quote-props': 1,
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/indent': [1, 2],
  },
});
