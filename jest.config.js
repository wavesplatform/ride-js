module.exports = {
    verbose: true,
    testRegex: '(/__tests__/.*|(\\.|/)(test))\\.tsx?$',
    transform: {
        "^.+\\.(ts|tsx)?$":  ['ts-jest', {
            diagnostics: false,
            tsconfig: 'tsconfig.json',
        }],
    },
    collectCoverage: true,
    coverageReporters: [
        "json-summary",
        "text",
        "lcov"
    ],
    moduleDirectories: ["node_modules", "src"],
    preset: 'ts-jest',
    testMatch: null,
    testEnvironment: 'node',
}
