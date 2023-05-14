/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    // To deal with annoying css imports that breaks tests
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    // "@theme-original/(.*)": "<rootDir>/node_modules/@docusaurus/theme-classic/lib/theme/$1/index.js"

    // https://huafu.github.io/ts-jest/user/config/#paths-mapping
    // If you use “baseUrl” and “paths” options in your tsconfig file, you should make sure the “moduleNameMapper” option in your Jest config is setup accordingly.
    "^@theme/JSONSchemaViewer/(.*)$": "<rootDir>/src/theme/JSONSchemaViewer/$1",
    "^@theme/JSONSchemaEditor/(.*)$": "<rootDir>/src/theme/JSONSchemaEditor/$1",
    "^@theme/MonacoEditor/(.*)$": "<rootDir>/src/theme/MonacoEditor/$1",
  },
  collectCoverageFrom: ["src/theme/JSONSchemaViewer/**/*.{js,ts,jsx,tsx}"],
  coveragePathIgnorePatterns: ["!*.d.ts"],
}
