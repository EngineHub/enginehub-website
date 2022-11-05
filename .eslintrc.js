const path = require("path");
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended",
    "next/core-web-vitals",
    "prettier", // enables eslint-plugin-prettier and eslint-config-prettier
  ],
  parserOptions: {
    ecmaVersion: 2022, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: path.resolve(__dirname, "./tsconfig.json"),
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-var-requires": "warn",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/no-unescaped-entities": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-argument": "off",

    // Type imports/exports
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
    "@typescript-eslint/consistent-type-exports": [
      "error",
      { fixMixedExportsWithInlineTypeSpecifier: true },
    ],

    "prettier/prettier": "warn",
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
