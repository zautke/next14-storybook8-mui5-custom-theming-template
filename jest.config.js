import nextJest from "next/jest";

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

const customJestConfig = {
	preset: "ts-jest",
	testURL: "http://localhost",
	//testEnvironment: "jsdom",
	testEnvironment: "node",
	collectCoverage: true,
	collectCoverageFrom: [
		"**/*.{ts,tsx}",
		"!**/node_modules/**",
		"!**/.storybook/**",
		"!**/tests/**",
		"!**/coverage/**",
		"!jest.config.js",
	],
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0,
		},
	},
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	moduleFileExtensions: ["ts", "tsx", "js", "json"],
	testRegex: "test",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1",
		// Handle module aliases (these paths must match those in tsconfig.json or jsconfig.json)
		"^@components/(.*)$": "<rootDir>/components/$1",
		// Mock static file imports
		"\\.(css|less|sass|scss)$": "identity-obj-proxy",
		"\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
	},
	modulePathIgnorePatterns: ["helpers.ts", "JsonSchema.ts"],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

export default createJestConfig(customJestConfig);
