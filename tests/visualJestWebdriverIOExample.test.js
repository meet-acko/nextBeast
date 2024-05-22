const ExamplePage = require("../pages/example.page");

const pages = {
    examplePage : new ExamplePage()
}

// Use below command to run this script in jest
// npm run jestWebdriverIOExample

describe('visual testing', () => {
    it('landing pages visual testing from csv sheet using jest-webdrioverio', async () => {
        await pages.examplePage.visualTestForLandingPagesUsingWebdriverIO("Baseline URLs");
    });
});