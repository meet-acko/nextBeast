const { test } = require('@playwright/test');
const ExamplePage = require("../pages/example.page");

const pages = {
    examplePage : new ExamplePage()
}

// Use below command to run this script in playwright
// npm run playwrightExample

test('visual testing', async ({ page }, testInfo) => {
    await pages.examplePage.visualTestForLandingPagesInPlaywright("Baseline URLs", await page);
});