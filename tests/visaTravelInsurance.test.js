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
            fullName1 : 'JOHN DOE'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.visaTravelInsurancePage.buyVisaTravelInsurance(data)
        //await pages.paymentPage.completePayment()
    })

})