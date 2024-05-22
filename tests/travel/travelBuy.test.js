const HomePage = require("../../pages/home.page");
const TravelBuyPage = require("../../pages/travelBuy.page");

const pages = {
    homePage : new HomePage(),
    travelBuyPage : new TravelBuyPage(),
}

describe('Travel Buy journey visual testing from App', () => {
    it('Travel bundled plan buy journey', async () => {
        let mobileNumber = pages.homePage.randomMobileNumber();
        await pages.homePage.login(mobileNumber);
        await pages.homePage.sleep(10);
    });
});