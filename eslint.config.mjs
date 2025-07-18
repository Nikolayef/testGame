import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Игнор
  {
    ignores: [
      'eslint.config.mjs',
      '**/*.d.ts',
      '**/config/**',
      'webpack.config.ts',
      'tsconfig.json',
      'package.json',
      'package-lock.json',
      'types.ts',
      'dist/**',
      'build/**',
      'node_modules/**',
    ],
  },

  // Базовый конфиг
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },

  // Базовые конфиги
  pluginJs.configs.recommended,

  //  только React конфиг
  pluginReact.configs.flat.recommended,

  // Airbnb конфиг
  ...compat.extends('airbnb'),
  ...compat.extends('airbnb-typescript'),

  // Файлы
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },

  // Кастомные правила
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },

  {
    rules: {
      'react/self-closing-comp': [
        'error',
        {
          component: false,
        },
      ],
      'default-param-last': ['warn'],
    },
  },

  {
    rules: {
      'no-param-reassign': 'off',
    },
  },

  {
    rules: {
      'jsx-a11y/label-has-associated-control': 'off',
    },
  },

  {
    rules: {
      'react/jsx-props-no-spreading': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // Prettier
  eslintConfigPrettier,

  {
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'no-confusing-arrow': ['off'],
      'implicit-arrow-linebreak': ['off'],
      'function-paren-newline': ['off'],
      indent: ['off'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
    },
  },

  // Настройки резолвера
  {
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
];
