// jest.config.ts
import type { Config } from 'jest';
import path from 'path';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testTimeout: 20000,
};

export default config;
