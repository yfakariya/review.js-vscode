import jsdoc from "eslint-plugin-jsdoc";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptEslintTslint from "@typescript-eslint/eslint-plugin-tslint";
import stylistic from "@stylistic/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { isPropertyDeclaration, isVariableDeclaration } from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    plugins: {
        jsdoc,
        "@typescript-eslint": typescriptEslint,
        "@typescript-eslint/tslint": typescriptEslintTslint,
        "@stylistic": stylistic
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.eslint.json",
        },
    },

    ignores: [
        '**/*.js',
        'lib/**/*.d.ts',
        'test/**/*.d.ts'
    ],

    files: [
        'lib/**/*.ts',
        'test/**/*.ts'
    ],

    rules: {
        "@typescript-eslint/tslint/config": ["error", {
            rules: {
                ban: [true, ["angular", "forEach"]],
            },
        }],

        "@typescript-eslint/naming-convention": ["error", {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE"],
            leadingUnderscore: "allow",
            trailingUnderscore: "forbid",
        }],

        "spaced-comment": ["off", "never", {
            markers: ["/"],
        }],

        "capitalized-comments": ["off", "never"],
        curly: "error",
        "eol-last": "off",
        "@eslint/guard-for-in": "off",
        "@stylistic/indent": ["error", 4],
        "jsdoc/check-alignment": "error",
        "jsdoc/check-indentation": "error",
        "no-unused-labels": "error",

        "max-len": ["off", {
            code: 140,
        }],

        "@typescript-eslint/no-explicit-any": "off",
        "no-caller": "error",
        "no-bitwise": "error",

        "no-console": ["off", {
            allow: [
                "log",
                "warn",
                "error",
                "dir",
                "timeLog",
                "assert",
                "clear",
                "count",
                "countReset",
                "group",
                "groupEnd",
                "table",
                "dirxml",
                "groupCollapsed",
                "Console",
                "profile",
                "profileEnd",
                "timeStamp",
                "context",
                "createTask",
            ],
        }],

        "no-multiple-empty-lines": "off",
        "no-new-wrappers": "error",
        "no-debugger": "off",
        // Use @typescript-eslint/no-redeclare instead of built-in no-redeclare to support overload
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": "error",
        "no-empty": "off",
        "no-eval": "error",
        "@typescript-eslint/dot-notation": "off",
        "comma-dangle": "off",
        "no-trailing-spaces": "error",
        "no-unused-expressions": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "off",
        "brace-style": ["error", "1tbs"],
        quotes: ["off", "double"],
        radix: "off",
        "@stylistic/semi": ["error"],
        eqeqeq: ["error", "smart"],

        "@typescript-eslint/typedef": ["off", {
            parameter: true,
            propertyDeclaration: true,
            variableDeclarationIgnoreFunction: true,
        }],

        "@typescript-eslint/type-annotation-spacing": "off"
    },
}];