const HomePage = require("../pages/home.page");

const pages = {
    homePage : new HomePage()
}

// Use below command to run this script in jest
// npm run example

describe('visual testing', () => {
    it('landing pages visual testing from csv sheet using jest-webdrioverio', async () => {
        let mobileNumber = pages.homePage.randomMobileNumber();
        await pages.homePage.login(mobileNumber);
        await pages.homePage.sleep(5);
    });
});