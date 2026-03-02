import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import react from 'eslint-plugin-react';

export default tseslint.config(
  {
    // 1. Игнорируемые папки (замена .eslintignore)
    ignores: ['dist', 'node_modules', 'build'],
  },
  {
    // 2. Базовые настройки для JS и TS
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // 1. Рекомендуемые правила от самого плагина React
      ...react.configs.recommended.rules, 
      ...react.configs['jsx-runtime'].rules, // Для поддержки нового JSX Transform

      // 2. Правила хуков
      ...reactHooks.configs.recommended.rules,
      
      // 3. Специфичное правило для Vite (Hot Reload)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      
      // 4. Ваши кастомные правила
      'quotes': ['error', 'single', { avoidEscape: true }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // В TS пропсы проверяются типами, а не PropTypes
    },
    settings: {
      react: {
        version: 'detect', // Авто-определение версии React
      },
    },
  },
  // 3. Отключаем правила, конфликтующие с Prettier (всегда в конце!)
  prettierConfig,
);
