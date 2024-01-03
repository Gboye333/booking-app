module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  env: {
   node: true,
  },
  parserOptions: {
    ecmaVersion: 6, // or a higher version if needed
    sourceType: 'module', // enables ES6 module syntax
  },
  plugins: ['import', 'react-refresh'], // Combine the plugin declarations into a single array
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};

