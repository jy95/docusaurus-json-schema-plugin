const { compilerOptions } = require("./tsconfig")

const mappings = Object.assign(
  {},
  {
    // To deal with annoying css imports that breaks tests
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  compilerOptions.paths
)

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: mappings,
  collectCoverageFrom: ["src/theme/JSONSchemaViewer/**/*.{js,ts,jsx,tsx}"],
  coveragePathIgnorePatterns: ["!*.d.ts"],
}
