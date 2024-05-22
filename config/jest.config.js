module.exports = {
    testEnvironment: './config/custom-webdriverio-playwright-environment.js',
    testEnvironment: "allure-jest/node",
    setupFilesAfterEnv: ["./config/jest-hooks.js"],
    rootDir: '../',
    testTimeout: 3*60*60*1000,
    snapshotResolver: './utils/snapshotResolver.js'
};