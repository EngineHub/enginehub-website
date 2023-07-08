module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended",
  ],
  env: {
    browser: true,
    node: true,
    es2023: true,
  },
  parserOptions: {
    ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: true,
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-var-requires": "warn",
    "react/prop-types": "off",
    "react/no-object-type-as-default-prop": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/no-unescaped-entities": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/restrict-template-expressions": "off",

    // Type imports/exports
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/consistent-type-exports": [
      "error",
      { fixMixedExportsWithInlineTypeSpecifier: true },
    ],
    "@typescript-eslint/no-import-type-side-effects": "error",
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
      },
    },
  },
};
