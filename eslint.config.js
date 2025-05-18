const tseslint = require('typescript-eslint');
const js = require('@eslint/js');
const node = require('eslint-plugin-node');
const prettier = require('eslint-config-prettier');

module.exports = [
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
                ecmaVersion: 'latest',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            node,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            'no-console': 'warn',
            'prefer-const': 'error',
            'no-unused-vars': 'off',
            'no-undef': 'off',
            'dot-notation': 'error',
            'consistent-return': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/ban-ts-comment': 'warn',
            'no-var': 'error',
            'arrow-spacing': ['error', { before: true, after: true }],
            'object-curly-spacing': ['error', 'always'],
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            'comma-dangle': ['error', 'only-multiline'],
        },
    },
    prettier,
];
