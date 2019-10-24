const path = require('path');

const OFF = 0;
const WARN = 1;
const ERROR = 2;
const CWD = process.cwd();

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:react/recommended',
  ],
  globals: {
    React: true,
  },

  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/class-name-casing': [OFF], //because interface name starts from tType
  },
  overrides: [
    {
      // enable check for explicit return type specifically for all .ts files
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['error'],
      },
    },
    {
      // disable check for explicit return type
      files: ['*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [OFF],
      },
    },
  ],
};
