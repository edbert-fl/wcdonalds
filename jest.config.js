module.exports = {
  testEnvironment: "jsdom",
  preset: "jest-expo",
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react",
      },
    },
  },
  moduleNameMapper: {
    "@env(.*)$": "<rootDir>/.env$1"
  },
  modulePaths: ["<rootDir>"],
  transform: {
    // "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(js|ts|tsx)$": "babel-jest"
  },
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.setup.js",
  ],
  moduleFileExtensions: ["js", "ts", "tsx", "jsx", "json", "node", "@env"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base|@react-native|@rneui|)",
    "jest-runner"
  ],
  coverageReporters: ["json-summary", "text", "lcov"],
  setupFiles: [
    "<rootDir>/jest.setup.js"
  ],
};
