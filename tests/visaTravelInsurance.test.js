const HomePage = require("../pages/home.page");
const PaymentPage = require("../pages/payment.page")
const VisaTravelInsurancePage = require("../pages/visaTravelInsurance.page");

const pages={
    visaTravelInsurancePage : new VisaTravelInsurancePage(),
    homePage : new HomePage(),
    paymentPage : new PaymentPage()
}

describe('Visa travel insurance scenarios',()=>{
    it('Dubai tourist visa application', async()=>{
        let data = {
            fullName : 'JOHN DOE',
            country : 'Dubai'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.visaTravelInsurancePage.buyVisaTravelInsurance(data)
        await pages.paymentPage.sleep(8)
        //await pages.paymentPage.completePayment()
    })

})