module.exports = {
  rootDir: '../',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/dist/',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    electron: '<rootDir>/config/mocks/electron.js',
  },
  clearMocks: true,
  coverageDirectory: 'coverage',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
