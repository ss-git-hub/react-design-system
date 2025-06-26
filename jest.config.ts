// jest.config.mjs
import { defaults } from 'jest-config';

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/', '.*\\.snap$', '.*\\.d\\.ts$'],
	collectCoverage: true,
	verbose: true,
	snapshotFormat: {
		escapeString: false,
		printBasicPrototype: false,
	},
	snapshotSerializers: [], // Empty array disables snapshot processing
	moduleNameMapper: {
		'\\.(css|scss)$': 'identity-obj-proxy',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
};
