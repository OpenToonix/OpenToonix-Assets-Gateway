import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import globals from 'globals';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended
});

export default [
  {
    ignores: ['public/'],
    languageOptions: { globals: globals.node },
    rules: {
      'linebreak-style': ['error', 'unix'],
      'no-console': 'error',
      'no-undef': 'error',
      'no-unused-vars': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': 'error',
      'prefer-template': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always']
    }
  },
  ...compat.extends('plugin:prettier/recommended')
];
