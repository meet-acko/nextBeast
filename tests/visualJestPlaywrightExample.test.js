const ExamplePage = require("../pages/example.page");

const pages = {
    examplePage : new ExamplePage()
}

// Use below command to run this script in jest
// npm run jestPlaywrightExample

describe('visual testing', () => {
    it('landing pages visual testing from csv sheet using jest-playwright', async () => {
        await pages.examplePage.visualTestForLandingPagesUsingPlaywright("Baseline URLs");
    });
});