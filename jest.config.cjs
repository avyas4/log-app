const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '.'),
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue',
  ],
  moduleNameMapper: {
    '^.+\\.(css|png|scss)$': '<rootDir>/test/file-stub.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // See known issue in: https://github.com/testing-library/user-event/issues/391
  // jest from a certain version stopped packaging in jsdom as a dep and must be manually
  // installed by the downstream project.
  // see: https://jestjs.io/blog/2021/05/25/jest-27
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    // required for vue3
    // otherwise we get the "ReferenceError: Vue is not defined"
    // see: https://test-utils.vuejs.org/migration/#-vue-vue3-jest-jest-28
    customExportConditions: ['node', 'node-addons'],
  },
  testPathIgnorePatterns: [
    '<rootDir>/test/end-to-end',
  ],
  transform: {
    // include both .mjs and .js files to be transformed by babel-jest so jest can parse those files properly
    '^.+\\.(mjs|js)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  resetMocks: true,
  // only match non-msw tests
  testMatch: [
    '**/*.spec.(js|ts)',
    '<rootDir>/src/**/*.spec.(js|ts)',
  ],
}
