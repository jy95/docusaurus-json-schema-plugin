const { pathsToModuleNameMapper } = require("ts-jest/utils")
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require("./tsconfig")

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    // To deal with annoying css imports that breaks tests
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    moduleNameMapper: pathsToModuleNameMapper(
      compilerOptions.paths /*, { prefix: '<rootDir>/' } */
    ),
  },
  collectCoverageFrom: ["src/theme/JSONSchemaViewer/**/*.{js,ts,jsx,tsx}"],
  coveragePathIgnorePatterns: ["!*.d.ts"],
}
