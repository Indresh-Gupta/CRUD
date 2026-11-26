export default {
    testEnvironment: "node",

    transform: {},

    testMatch: [
        "**/tests/**/*.test.js"
    ],

    setupFilesAfterEnv: [
        "<rootDir>/tests/setup.js"
    ],

    clearMocks: true,

    collectCoverageFrom: [
        "Controller/**/*.js",
        "Model/**/*.js",
        "route/**/*.js",
        "!index.js"
    ]
};