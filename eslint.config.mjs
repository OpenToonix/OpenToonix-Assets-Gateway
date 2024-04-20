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
  { languageOptions: { globals: globals.node } },
  ...compat.extends('plugin:prettier/recommended', '.eslintrc.js')
];
