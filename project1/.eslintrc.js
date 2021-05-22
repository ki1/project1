module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
    'jest/globals': true,
  },
  globals: {
    process: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'plugin:react-hooks/recommended',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaVersion: 9,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jest', 'sonarjs', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'default-param-last': ['error'],
    'no-shadow': 'warn',
    'react/prop-types': 0,
    'react/jsx-uses-vars': [2],
    'react/jsx-no-undef': 'error',
    'jsx-a11y/anchor-is-valid': 0, // nextjs Link requires a tag without anchor
    'no-console': 0,
    'react-hooks/rules-of-hooks': 0, // We can use hooks inside of functions
    'react/react-in-jsx-scope': 0, // React not need to be in scope in JS files that are not components
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
