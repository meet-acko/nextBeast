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
        let mobileNumber = pages.homePage.randomMobileNumber()
        let setMonthCount = pages.homePage.randomNumber(2,9)
        let data = {
            fullName : 'JOHN DOE',
            country : 'France',
            visaType : 'Tourist',
            package : ' 30 Days Single Entry ',
            travelStartDate: '01',
            travelEndDate: '01',
            travelStartMonth: ' '+pages.homePage.getNextMonthName()+' ',
            setMonth: setMonthCount,
            travelEndMonth: ' '+pages.homePage.getEndMonthName(setMonthCount)+' ',
            gender: pages.homePage.getRandomGender().toUpperCase(),
            dayOfDOB: pages.homePage.randomNumber(5, 20),
            monthOfDOB: pages.homePage.randomNumber(2, 11),
            yearOfDOB: pages.homePage.randomNumber(1990, 1999),
            occupation: 'Employee',
            mobile: mobileNumber,
            email: 'nitin.kumar_eupho_blr@acko.tech',
            passportNumber: pages.homePage.randomName(5),
            pageName: 'visaTravelInsurance',
            locatorName: 'dobYear'
        }
        await pages.homePage.addKYCSuccess(data.fullName, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.visaTravelInsurancePage.buyVisaTravelInsurance(data)
        await pages.paymentPage.sleep(8)
        //await pages.paymentPage.completePayment()
    })

})