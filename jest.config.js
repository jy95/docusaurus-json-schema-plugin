/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    // To deal with annoying css imports that breaks tests
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    // "@theme-original/(.*)": "<rootDir>/node_modules/@docusaurus/theme-classic/lib/theme/$1/index.js"
  },
}
