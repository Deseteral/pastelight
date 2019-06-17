module.exports = {
  rootDir: '../',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/out/',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  clearMocks: true,
  coverageDirectory: 'coverage',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
