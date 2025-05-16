import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/*.js'],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/restrict-template-expressions': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-explicit-any': 1,
      '@typescript-eslint/no-unused-vars': 1,
      '@typescript-eslint/require-await': 1,
      '@typescript-eslint/no-unsafe-member-access': 0,
    },
  },
);
