const HomePage = require("../pages/home.page");
const PaymentPage = require("../pages/payment.page")
const VisaTravelInsurancePage = require("../pages/visaTravelInsurance.page");

const pages={
    visaTravelInsurancePage : new VisaTravelInsurancePage(),
    homePage : new HomePage(),
    paymentPage : new PaymentPage()
}

describe('Visa travel insurance scenarios',()=>{
    it('France tourist visa application', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        let data = {
            fullName : 'JOHN DOE',
            country : 'France',
            visaType : 'Tourist',
            package : ' 30 Days Single Entry ',
            travelStartDate: '01',
            travelEndDate: '01',
            travelStartMonth: ' '+pages.homePage.getNextMonthName()+' ',
            setMonth: 1,
            travelEndMonth: ' '+pages.homePage.getEndMonthName()+' ',
            gender: pages.homePage.getRandomGender().toUpperCase(),
            dob: pages.homePage.randomNumber(5, 20)+"/"+pages.homePage.randomNumber(2, 11)+"/"+pages.homePage.randomNumber(1990, 1999),
            occupation: 'Employee',
            mobile: mobileNumber,
            email: 'nitin.kumar_eupho_blr@acko.tech',
            passportNumber: pages.homePage.randomName(5)
        }
        await pages.homePage.addKYCSuccess(data.fullName, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.visaTravelInsurancePage.buyVisaTravelInsurance(data)
        await pages.paymentPage.sleep(8)
        //await pages.paymentPage.completePayment()
    })

})