module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.js$': 'babel-jest',
        '^.+\\.ts$': 'ts-jest',
    },
    testMatch: [
        '**/src/components/**/__tests__/*.spec.[jt]s?(x)'
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    }
};
