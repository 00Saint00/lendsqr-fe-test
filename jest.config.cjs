const path = require("path");

module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      { tsconfig: path.resolve(__dirname, "tsconfig.jest.json") },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
};
