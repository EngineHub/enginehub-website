import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs['recommendedTypeChecked'],
    ...compat.plugins('simple-import-sort'),
    unicorn.configs.recommended,
    sonarjs.configs.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    reactHooks.configs.recommended,
    {
        plugins: {
            '@next/next': fixupPluginRules(nextPlugin)
        },
        settings: {
            react: {
                version: 'detect'
            },
            'import/resolver': {
                typescript: true
            },
            next: {
                rootDir: ['/builds', '/golf', '/paste', '/main-site']
            }
        },
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                projectService: true
            }
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,

            // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
            // React
            'react/prop-types': 'off',
            'react/no-unescaped-entities': 'off',
            'react/no-unstable-nested-components': 'error',
            'react/no-object-type-as-default-prop': 'error',

            // TypeScript
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-empty-function': 'warn',
            '@typescript-eslint/no-var-requires': 'warn',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_' }
            ],
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports' }
            ],
            '@typescript-eslint/consistent-type-exports': [
                'error',
                { fixMixedExportsWithInlineTypeSpecifier: true }
            ],
            '@typescript-eslint/no-import-type-side-effects': 'error',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/unbound-method': 'off',

            // Imports
            'import/no-duplicates': 'error',
            'import/no-named-as-default': 'off',
            'import/no-named-as-default-member': 'off',
            'import/namespace': 'off',
            'import/default': 'off',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // Side effect imports.
                        [String.raw`^\u0000`],
                        // Packages.
                        // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
                        [String.raw`^@?\w`],
                        // Local imports.
                        ['@enginehub/'],
                        // Relative imports.
                        [String.raw`^\.`]
                    ]
                }
            ],

            'sonarjs/no-duplicate-string': 'off',
            'sonarjs/prefer-read-only-props': 'off',
            'sonarjs/function-return-type': 'off',
            'sonarjs/pseudo-random': 'off',

            // Unicorn rules
            'unicorn/filename-case': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/prefer-add-event-listener': 'off',
            'unicorn/prefer-ternary': 'off',
            'unicorn/no-null': 'off',
            'unicorn/prefer-node-protocol': 'off',
            'unicorn/catch-error-name': 'off',
            'unicorn/prefer-module': 'off',
            'unicorn/no-empty-file': 'off',
            'unicorn/no-await-expression-member': 'off',
            'unicorn/no-useless-undefined': 'warn',
            'unicorn/prefer-string-replace-all': 'error',
            'unicorn/no-abusive-eslint-disable': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/prefer-global-this': 'off'
        }
    }
);
