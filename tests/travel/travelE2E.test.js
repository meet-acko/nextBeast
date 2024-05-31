const HomePage = require("../../pages/home.page");
const PaymentPage = require("../../pages/payment.page");
const TravelBuyPage = require("../../pages/travelBuy.page");
const TravelPDPPage = require("../../pages/travelPDP.page");

const pages = {
    homePage : new HomePage(),
    travelBuyPage : new TravelBuyPage(),
    travelPDPPage : new TravelPDPPage(),
    paymentPage : new PaymentPage()
}

describe('Travel Buy journey visual testing from App', () => {
    it('Travel bundled plan buy journey', async () => {
        let data = {
            mobileNumber : pages.homePage.randomMobileNumber(),
            fullName :  "Jhon Snow",//"Self " + pages.homePage.randomName(7),
            dobDate : pages.homePage.randomNumber(5, 20),
            dobMonth : pages.homePage.randomNumber(2, 11), //month < 10 ? "0" + month : "" + month,
            dobYear : pages.homePage.randomNumber(1990, 1999),
            pincode : "560068",
            email : "meet.marakana@acko.tech",//`meet.marakana+${pages.homePage.randomName(5)}@acko.tech`,
            passport : `ADFER344SD`
        }
        await pages.homePage.addKYCSuccess(data.fullName, data.mobileNumber);
        await pages.homePage.login(data.mobileNumber);
        await pages.homePage.goToMyAccountsPage();
        await pages.homePage.verifyNoPolicyText();
        await pages.travelBuyPage.goToTravelBuyJourney(data);
        await pages.homePage.sleep(30);
        // await pages.paymentPage.completePayment();
        await pages.homePage.sleep(2);
        await pages.travelBuyPage.backDatePolicy(data);
        await pages.travelBuyPage.goToMyPolicy();
        await pages.travelPDPPage.raiseAClaim(data);
    });
});