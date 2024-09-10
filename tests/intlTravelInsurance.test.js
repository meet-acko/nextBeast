const HomePage = require("../pages/home.page");
const PaymentPage = require("../pages/payment.page")
const IntlTravelInsurancePage = require("../pages/intlTravelInsurance.page");

const pages={
    intlTravelInsurancePage : new IntlTravelInsurancePage(),
    homePage : new HomePage(),
    paymentPage : new PaymentPage()
}

describe('International travel insurance scenarios',()=>{
    it.only('Intl Travel buy journey for bundled plan for 1 Adults & 1 Child 10 days period and 50K SI', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '10thOfMonth',
            travellerType1: "Adult",
            travellerType2: "Child",
            priceSet:'$50,000',
            fullName1: "JOHN DOE",
            dayOfDOB1: pages.homePage.randomNumber(5, 20),
            monthOfDOB1: pages.homePage.randomNumber(2, 11),
            yearOfDOB1: pages.homePage.randomNumber(1990, 1999),
            selectGender1: pages.homePage.getRandomGender(),
            pincode: "560037",
            emailInput: 'nitin.kumar_eupho_blr@acko.tech',
            fullName2: "Self " + pages.homePage.randomName(5),
            dayOfDOB2: pages.homePage.randomNumber(4, 19),
            monthOfDOB2: pages.homePage.randomNumber(3, 6),
            yearOfDOB2: pages.homePage.randomNumber(1991, 1995),
            selectGender2: pages.homePage.getRandomGender(),
            specializedContinue: 'specializedContinue',
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId(data)
    })

    it('Intl Travel buy journey for bundled plan for 1 Adults & 1 Senior 120 days period and 100K SI', async()=>{
        let data = {
            clickOnCountry1 : "United Kingdom",
            setMonth : 4,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '1stOfMonth',
            travellerType1: "Adult",
            travellerType2: "Senior citizen",
            priceSet:'$100,000',
            fullName1: "JOHN DOE",
            dayOfDOB1: pages.homePage.randomNumber(5, 20),
            monthOfDOB1: pages.homePage.randomNumber(2, 11),
            yearOfDOB1: pages.homePage.randomNumber(1990, 1999),
            selectGender1: pages.homePage.getRandomGender(),
            pincode: pages.homePage.generateRandomPincode(),
            emailInput: 'nitin.kumar_eupho_blr@acko.tech',
            fullName2: "Self " + pages.homePage.randomName(5),
            dayOfDOB2: pages.homePage.randomNumber(4, 19),
            monthOfDOB2: pages.homePage.randomNumber(3, 6),
            yearOfDOB2: pages.homePage.randomNumber(1991, 1995),
            selectGender2: pages.homePage.getRandomGender(),
            specializedContinue: 'specializedContinue'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
    })

    it('Intl Travel buy journey for bundled plan for 2 Adults 30days period and 200K SI', async()=>{
        let data = {
            clickOnCountry1 : "United Kingdom",
            setMonth : 1,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '1stOfMonth',
            travellerType1: "Adult",
            travellerType2: "Adult",
            priceSet:'$200,000',
            fullName1: "JOHN DOE",
            dayOfDOB1: pages.homePage.randomNumber(5, 20),
            monthOfDOB1: pages.homePage.randomNumber(2, 11),
            yearOfDOB1: pages.homePage.randomNumber(1990, 1999),
            selectGender1: pages.homePage.getRandomGender(),
            pincode: pages.homePage.generateRandomPincode(),
            emailInput: 'nitin.kumar_eupho_blr@acko.tech',
            fullName2: "Self " + pages.homePage.randomName(5),
            dayOfDOB2: pages.homePage.randomNumber(4, 19),
            monthOfDOB2: pages.homePage.randomNumber(3, 6),
            yearOfDOB2: pages.homePage.randomNumber(1991, 1995),
            selectGender2: pages.homePage.getRandomGender(),
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period 4 hrs only flight cover', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '10thOfMonth',
            travellerType1: "Adult",
            travellerType2: "Adult",
            fullName1: "JOHN DOE",
            dayOfDOB1: pages.homePage.randomNumber(5, 20),
            monthOfDOB1: pages.homePage.randomNumber(2, 11),
            yearOfDOB1: pages.homePage.randomNumber(1990, 1999),
            selectGender1: pages.homePage.getRandomGender(),
            pincode: pages.homePage.generateRandomPincode(),
            emailInput: 'nitin.kumar_eupho_blr@acko.tech',
            fullName2: "Self " + pages.homePage.randomName(5),
            dayOfDOB2: pages.homePage.randomNumber(4, 19),
            monthOfDOB2: pages.homePage.randomNumber(3, 6),
            yearOfDOB2: pages.homePage.randomNumber(1991, 1995),
            selectGender2: pages.homePage.getRandomGender(),
            noThanksMedicalCover: 'noThanks',
            noThanksMissedMedicalCover: 'noThanks',
            noThanksBagaggeCover: 'noThanks',
            flightHoursOnlyFlightCover: '4 hours',
            addForOnlyFlightCover: 'addFor'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults, 10 days period, 100K SI, 4hrs, and all covers', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '10thOfMonth',
            travellerType1: "Adult",
            travellerType2: "Adult",
            priceSet:'$100,000',
            fullName1: "JOHN DOE",
            dayOfDOB1: pages.homePage.randomNumber(5, 20),
            monthOfDOB1: pages.homePage.randomNumber(2, 11),
            yearOfDOB1: pages.homePage.randomNumber(1990, 1999),
            selectGender1: pages.homePage.getRandomGender(),
            pincode: pages.homePage.generateRandomPincode(),
            emailInput: 'nitin.kumar_eupho_blr@acko.tech',
            fullName2: "Self " + pages.homePage.randomName(5),
            dayOfDOB2: pages.homePage.randomNumber(4, 19),
            monthOfDOB2: pages.homePage.randomNumber(3, 6),
            yearOfDOB2: pages.homePage.randomNumber(1991, 1995),
            selectGender2: pages.homePage.getRandomGender(),
            flightHoursWithAllCovers: '4 hours',
            addForAllCovers: 'addFor'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period 100K SI only medical cover', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '10thOfMonth',
            travellerType1: "Adult",
            travellerType2: "Adult",
            fullName1: "JOHN DOE",
            dayOfDOB1: pages.homePage.randomNumber(5, 20),
            monthOfDOB1: pages.homePage.randomNumber(2, 11),
            yearOfDOB1: pages.homePage.randomNumber(1990, 1999),
            selectGender1: pages.homePage.getRandomGender(),
            pincode: pages.homePage.generateRandomPincode(),
            emailInput: 'nitin.kumar_eupho_blr@acko.tech',
            fullName2: "Self " + pages.homePage.randomName(5),
            dayOfDOB2: pages.homePage.randomNumber(4, 19),
            monthOfDOB2: pages.homePage.randomNumber(3, 6),
            yearOfDOB2: pages.homePage.randomNumber(1991, 1995),
            selectGender2: pages.homePage.getRandomGender(),
            addForOnlyMedicalCover: 'addFor',
            noThanksFlightCover: 'noThanks',
            noThanksBagaggeCover: 'noThanks'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period and only baggage cover', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '10thOfMonth',
            travellerType1: "Adult",
            travellerType2: "Adult",
            fullName1: "JOHN DOE",
            dayOfDOB1: pages.homePage.randomNumber(5, 20),
            monthOfDOB1: pages.homePage.randomNumber(2, 11),
            yearOfDOB1: pages.homePage.randomNumber(1990, 1999),
            selectGender1: pages.homePage.getRandomGender(),
            pincode: pages.homePage.generateRandomPincode(),
            emailInput: 'nitin.kumar_eupho_blr@acko.tech',
            fullName2: "Self " + pages.homePage.randomName(5),
            dayOfDOB2: pages.homePage.randomNumber(4, 19),
            monthOfDOB2: pages.homePage.randomNumber(3, 6),
            yearOfDOB2: pages.homePage.randomNumber(1991, 1995),
            selectGender2: pages.homePage.getRandomGender(),
            noThanksMedicalCover: 'noThanks',
            noThanksMissedMedicalCover: 'noThanks',
            noThanksFlightCover: 'noThanks',
            addForBagaggeCover: 'addFor'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
    })
})