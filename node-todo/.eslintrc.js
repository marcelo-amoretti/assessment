module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  ignorePatterns: ['node_modules/'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: { 'max-len': ['error', 200] },
};
