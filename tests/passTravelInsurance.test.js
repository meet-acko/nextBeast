const HomePage = require("../pages/home.page");
const PaymentPage = require("../pages/payment.page")
const PassTravelInsurancePage = require("../pages/passTravelInsurance.page");

const pages={
    passTravelInsurancePage : new PassTravelInsurancePage(),
    homePage : new HomePage(),
    paymentPage : new PaymentPage()
}

describe('Pass travel insurance scenarios',()=>{
    it('Pass travel application', async()=>{
        let data = {
            fullName: "JOHN DOE",
            pincode: '560037',
            email: 'nitin.kumar_eupho_blr@acko.tech',
            flatNo: pages.homePage.randomNumber(5, 20),
            street: pages.homePage.randomName(5),
            city: pages.homePage.randomName(4),
            state: pages.homePage.randomName(6)
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.passTravelInsurancePage.buyPassTravelInsurance(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(12)
        await pages.passTravelInsurancePage.addAddressForBuyPassTravelInsurance(data)
        await pages.passTravelInsurancePage.apiValidationForBuyPassTravelInsurance(data)
    })

})