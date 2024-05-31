import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import sort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';
import reactRefresh from 'eslint-plugin-react-refresh';

const filename = fileURLToPath(import.meta.url);
const baseDirectory = path.dirname(filename);

const compat = new FlatCompat({ baseDirectory });

export default [
  js.configs.recommended,
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('airbnb-typescript/base'),
  ...compat.extends('plugin:react-hooks/recommended'),
  ...compat.extends('prettier'),
  ...compat.extends('plugin:prettier/recommended'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier,
      'unused-imports': unusedImports,
      import: importPlugin,
      'simple-import-sort': sort,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: path.join(baseDirectory, `./tsconfig.json`),
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      ...typescriptEslint.configs.rules,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'no-duplicate-imports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'simple-import-sort/imports': 0,
      'simple-import-sort/exports': 0,
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': 0,
      '@typescript-eslint/lines-between-class-members': [
        'error',
        {
          enforce: [
            { blankLine: 'never', prev: '*', next: 'field' },
            { blankLine: 'never', prev: 'field', next: '*' },
            { blankLine: 'always', prev: '*', next: 'method' },
          ],
        },
      ],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/extensions': 0,
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'error',
      // '@typescript-eslint/typedef': [
      //   'error',
      //   {
      //     parameter: true,
      //     arrowParameter: true,
      //     // variableDeclaration: true,
      //     memberVariableDeclaration: true,
      //     // objectDestructuring: true,
      //   },
      // ],
    },
  },

  {
    ignores: ['./eslint.config.mjs', './tsconfig.json'],
  },
];
