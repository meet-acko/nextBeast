const HomePage = require("../pages/home.page");
const IntlTravelInsurancePage = require("../pages/intlTravelInsurance.page");

const pages={
    intlTravelInsurancePage : new IntlTravelInsurancePage(),
    homePage : new HomePage()
}

describe('International travel insurance scenarios',()=>{
    it('Intl Travel buy journey for bundled plan for 1 Adults & 1 Child 10 days period and 50K SI', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '10thOfMonth',
            travellerType1: "Adult",
            travellerType2: "Child",
            priceSet:'$50,000',
            fullName1: "Meet Marakana",
            dayOfDOB1: '15',
            monthOfDOB1: '05',
            yearOfDOB1: '1997',
            selectGender1: 'Male',
            pincode: '560037',
            emailInput: 'meet.marakana@acko.tech',
            fullName2: "Chandu champion",
            dayOfDOB2: '16',
            monthOfDOB2: '06',
            yearOfDOB2: '1998',
            selectGender2: 'Male',
            specializedContinue: 'specializedContinue'
        }
        await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('Intl Travel buy journey for bundled plan for 1 Adults & 1 Senior 120 days period and 100K SI', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let data = {
            clickOnCountry1 : "United Kingdom",
            setMonth : 4,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '1stOfMonth',
            travellerType1: "Adult",
            travellerType2: "Senior citizen",
            priceSet:'$100,000',
            fullName1: "Meet Marakana",
            dayOfDOB1: '15',
            monthOfDOB1: '05',
            yearOfDOB1: '1997',
            selectGender1: 'Male',
            pincode: '560037',
            emailInput: 'meet.marakana@acko.tech',
            fullName2: "Chandu champion",
            dayOfDOB2: '16',
            monthOfDOB2: '06',
            yearOfDOB2: '1998',
            selectGender2: 'Male',
            specializedContinue: 'specializedContinue'
        }
        await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('Intl Travel buy journey for bundled plan for 2 Adults 30days period and 200K SI', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let data = {
            clickOnCountry1 : "United Kingdom",
            setMonth : 1,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '1stOfMonth',
            travellerType1: "Adult",
            travellerType2: "Adult",
            priceSet:'$200,000',
            fullName1: "Meet Marakana",
            dayOfDOB1: '15',
            monthOfDOB1: '05',
            yearOfDOB1: '1997',
            selectGender1: 'Male',
            pincode: '560037',
            emailInput: 'meet.marakana@acko.tech',
            fullName2: "Chandu champion",
            dayOfDOB2: '16',
            monthOfDOB2: '06',
            yearOfDOB2: '1998',
            selectGender2: 'Male',
        }
        await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period 4 hrs only flight cover', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '10thOfMonth',
            travellerType1: "Adult",
            travellerType2: "Adult",
            fullName1: "Meet Marakana",
            dayOfDOB1: '15',
            monthOfDOB1: '05',
            yearOfDOB1: '1997',
            selectGender1: 'Male',
            pincode: '560037',
            emailInput: 'meet.marakana@acko.tech',
            fullName2: "Chandu champion",
            dayOfDOB2: '16',
            monthOfDOB2: '06',
            yearOfDOB2: '1998',
            selectGender2: 'Male',
            noThanksMedicalCover: 'noThanks',
            noThanksMissedMedicalCover: 'noThanks',
            noThanksBagaggeCover: 'noThanks',
            flightHoursOnlyFlightCover: '4 hours',
            addForOnlyFlightCover: 'addFor'
        }
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults, 10 days period, 100K SI, 4hrs, and all covers', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '10thOfMonth',
            travellerType1: "Adult",
            travellerType2: "Adult",
            priceSet:'$100,000',
            fullName1: "Meet Marakana",
            dayOfDOB1: '15',
            monthOfDOB1: '05',
            yearOfDOB1: '1997',
            selectGender1: 'Male',
            pincode: '560037',
            emailInput: 'meet.marakana@acko.tech',
            fullName2: "Chandu champion",
            dayOfDOB2: '16',
            monthOfDOB2: '06',
            yearOfDOB2: '1998',
            selectGender2: 'Male',
            flightHoursWithAllCovers: '4 hours',
            addForAllCovers: 'addFor'
        }
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period 100K SI only medical cover', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '10thOfMonth',
            travellerType1: "Adult",
            travellerType2: "Adult",
            fullName1: "Meet Marakana",
            dayOfDOB1: '15',
            monthOfDOB1: '05',
            yearOfDOB1: '1997',
            selectGender1: 'Male',
            pincode: '560037',
            emailInput: 'meet.marakana@acko.tech',
            fullName2: "Chandu champion",
            dayOfDOB2: '16',
            monthOfDOB2: '06',
            yearOfDOB2: '1998',
            selectGender2: 'Male',
            addForOnlyMedicalCover: 'addFor',
            noThanksFlightCover: 'noThanks',
            noThanksBagaggeCover: 'noThanks'
        }
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period and only baggage cover', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            firstOfMonth: '1stOfMonth',
            lastOfMonth: '10thOfMonth',
            travellerType1: "Adult",
            travellerType2: "Adult",
            fullName1: "Meet Marakana",
            dayOfDOB1: '15',
            monthOfDOB1: '05',
            yearOfDOB1: '1997',
            selectGender1: 'Male',
            pincode: '560037',
            emailInput: 'meet.marakana@acko.tech',
            fullName2: "Chandu champion",
            dayOfDOB2: '16',
            monthOfDOB2: '06',
            yearOfDOB2: '1998',
            selectGender2: 'Male',
            noThanksMedicalCover: 'noThanks',
            noThanksMissedMedicalCover: 'noThanks',
            noThanksFlightCover: 'noThanks',
            addForBagaggeCover: 'addFor'
        }
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.intlTravelInsurancePage.paymentProcess()
    })
})