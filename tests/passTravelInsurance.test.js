const HomePage = require("../pages/home.page");
const PaymentPage = require("../pages/payment.page")
const PassTravelInsurancePage = require("../pages/passTravelInsurance.page");

const pages={
    passTravelInsurancePage : new PassTravelInsurancePage(),
    homePage : new HomePage(),
    paymentPage : new PaymentPage()
}

describe('International travel insurance scenarios',()=>{
    it('Intl Travel buy journey for bundled plan for 1 Adult & 1 Child 10 days period and 50K SI', async()=>{
        let data = {
            fullName1: "JOHN DOE",
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.passTravelInsurancePage.buyPassTravelInsurance(data)
        await pages.paymentPage.sleep(2)
        //await pages.paymentPage.completePayment()
    })

})