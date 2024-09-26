module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
      'ts-jest': {
        isolatedModules: true,
      },
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: ['**/tests/**/*.test.(ts|js)'],
    moduleNameMapper: {
      'uuid': require.resolve('uuid'),
    },
  };
  