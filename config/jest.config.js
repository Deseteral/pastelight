// For a detailed explanation regarding each configuration property, visit:
// https://facebook.github.io/jest/docs/en/configuration.html

module.exports = {
  rootDir: '../',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/out/',
  ],
  transform: {
    '^.+\\.jsx?$': './config/script.transform.js',
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
