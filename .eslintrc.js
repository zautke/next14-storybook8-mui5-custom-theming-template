export default {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:storybook/recommended",
		"plugin:playwright/recommended",
		"plugin:jest-dom/recommended",
		"next/core-web-vitals",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
		tsconfigRootDir: __dirname,
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: [
		"@typescript-eslint",
		"react",
		"jest",
		"playwright",
		"storybook",
		"jsx-a11y",
		"jest-dom",
		"testing-library",
		"tsdoc",
	],
	rules: {
		"tsdoc/syntax": "warn",
	},
	settings: {
		react: {
			version: "latest",
		},
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parser: "@typescript-eslint/parser",
		},
	],
};
