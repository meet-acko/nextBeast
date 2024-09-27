const HomePage = require("../pages/home.page");
const PaymentPage = require("../pages/payment.page")
const IntlTravelInsurancePage = require("../pages/intlTravelInsurance.page");

const pages={
    intlTravelInsurancePage : new IntlTravelInsurancePage(),
    homePage : new HomePage(),
    paymentPage : new PaymentPage()
}

describe('International travel insurance scenarios',()=>{
    it('Intl Travel buy journey for bundled plan for 1 Adult & 1 Child 10 days period and 50K SI', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
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
            yearOfDOB2: pages.homePage.randomNumber(2015, 2023),
            selectGender2: pages.homePage.getRandomGender(),
            specializedContinue: 'specializedContinue',
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for bundled plan for 1 Adult & 1 Senior 120 days period and 100K SI', async()=>{
        let data = {
            clickOnCountry1 : "United Kingdom",
            setMonth : 4,
            travelStartDate: '01',
            travelEndDate: '01',
            travellerType1: "Adult",
            travellerType2: "Senior citizen",
            priceSet:'$100,000',
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
            yearOfDOB2: pages.homePage.randomNumber(1955, 1960),
            selectGender2: pages.homePage.getRandomGender(),
            specializedContinue: 'specializedContinue'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for bundled plan for 2 Adult 30days period and 200K SI', async()=>{
        let data = {
            clickOnCountry1 : "United Kingdom",
            setMonth : 1,
            travelStartDate: '01',
            travelEndDate: '01',
            travellerType1: "Adult",
            travellerType2: "Adult",
            priceSet:'$200,000',
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
            yearOfDOB2: pages.homePage.randomNumber(1990, 1999),
            selectGender2: pages.homePage.getRandomGender(),
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for bundled plan for 1 Adult, 1 Senior, and 1 Child, 30 days period, and 150K SI', async()=>{
        let data = {
            clickOnCountry1 : "United Kingdom",
            setMonth : 1,
            travelStartDate: '01',
            travelEndDate: '01',
            travellerType1: "Adult",
            travellerType2: "Child",
            travellerType3: "Senior citizen",
            priceSet:'$150,000',
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
            yearOfDOB2: pages.homePage.randomNumber(1955, 1960),
            selectGender2: pages.homePage.getRandomGender(),
            fullName3: "Self " + pages.homePage.randomName(4),
            dayOfDOB3: pages.homePage.randomNumber(3, 18),
            monthOfDOB3: pages.homePage.randomNumber(2, 7),
            yearOfDOB3: pages.homePage.randomNumber(2015, 2023),
            selectGender3: pages.homePage.getRandomGender(),
            specializedContinue: 'specializedContinue',
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('All cover names of standard bundled plan', async()=>{
        let data = {
            clickOnCountry1 : "United Kingdom",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
            travellerType1: "Adult",
            fullName1: "JOHN DOE",
            dayOfDOB1: pages.homePage.randomNumber(5, 20),
            monthOfDOB1: pages.homePage.randomNumber(2, 11),
            yearOfDOB1: pages.homePage.randomNumber(1990, 1999),
            selectGender1: pages.homePage.getRandomGender(),
            pincode: "560037",
            emailInput: 'nitin.kumar_eupho_blr@acko.tech',
            covers: 'Standard',
            plans : [
                'Hospitalisation due to illness',
                'Hospitalisation due to accident',
                'Missed flight',
                'Trip cancellation',
                'Delay of checked-in baggage',
                'Total loss of checked-in baggage',
                'Loss of passport',
                'Death due to accident',
                'Total disability',
                'Missed connecting flight',
                'Emergency evacuation',
                'Travel expenses of immediate relative',
                'Repatriation of mortal remains in case of death'
            ]
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('All cover names of comfort bundled plan', async()=>{
        let data = {
            clickOnCountry1 : "United Kingdom",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
            travellerType1: "Adult",
            fullName1: "JOHN DOE",
            dayOfDOB1: pages.homePage.randomNumber(5, 20),
            monthOfDOB1: pages.homePage.randomNumber(2, 11),
            yearOfDOB1: pages.homePage.randomNumber(1990, 1999),
            selectGender1: pages.homePage.getRandomGender(),
            pincode: "560037",
            emailInput: 'nitin.kumar_eupho_blr@acko.tech',
            covers: 'Comfort',
            plans : [
                'Hospitalisation due to illness',
                'Hospitalisation due to accident',
                'Daily hospitalisation allowance',
                'Doctor consultation',
                'Flight delay',
                'Missed flight',
                'Trip cancellation',
                'Trip rescheduling',
                'Delay of checked-in baggage',
                'Total loss of checked-in baggage',
                'Damage of checked-in baggage',
                'Loss of passport',
                'Trip cancellation due to covid',
                'Death due to accident',
                'Total disability',
                'Physiotherapy',
                'Missed connecting flight',
                'Home cover',
                'Emergency trip extension',
                'Legal liability',
                'Emergency evacuation',
                'Travel expenses of immediate relative',
                'Repatriation of mortal remains in case of death'
            ]
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for bundled plan for 2 Adult 30days period and 200K SI for USA', async()=>{
        let data = {
            clickOnCountry1 : "United States of America (USA)",
            setMonth : 1,
            travelStartDate: '01',
            travelEndDate: '01',
            travellerType1: "Adult",
            travellerType2: "Adult",
            priceSet:'$200,000',
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
            yearOfDOB2: pages.homePage.randomNumber(1990, 1999),
            selectGender2: pages.homePage.getRandomGender(),
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for bundled plan for 1 Adult & 1 Senior 120 days period and 100K SI for Canada', async()=>{
        let data = {
            clickOnCountry1 : "Canada",
            setMonth : 4,
            travelStartDate: '01',
            travelEndDate: '01',
            travellerType1: "Adult",
            travellerType2: "Senior citizen",
            priceSet:'$100,000',
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
            yearOfDOB2: pages.homePage.randomNumber(1955, 1960),
            selectGender2: pages.homePage.getRandomGender(),
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnBundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period 4 hrs only flight cover', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
            travellerType1: "Adult",
            travellerType2: "Adult",
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
            yearOfDOB2: pages.homePage.randomNumber(1990, 1999),
            selectGender2: pages.homePage.getRandomGender(),
            noMedicalCover: 'noThanks',
            addHourForFlightCover: '4 hours',
            addFlightCover: 'addFor',
            noBagaggeCover: 'noThanks'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults, 10 days period, 100K SI, 3hrs, and all covers', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
            travellerType1: "Adult",
            travellerType2: "Adult",
            priceSet:'$100,000',
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
            yearOfDOB2: pages.homePage.randomNumber(1990, 1999),
            selectGender2: pages.homePage.getRandomGender(),
            allCovers: 'addFor',
            addHourForFlightCover: '3 hours'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period 100K SI only medical cover', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
            travellerType1: "Adult",
            travellerType2: "Adult",
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
            yearOfDOB2: pages.homePage.randomNumber(1990, 1999),
            selectGender2: pages.homePage.getRandomGender(),
            addMedicalCover: 'addFor',
            noFlightCover: 'noThanks',
            noBagaggeCover: 'noThanks'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period and only baggage cover', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
            travellerType1: "Adult",
            travellerType2: "Adult",
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
            yearOfDOB2: pages.homePage.randomNumber(1990, 1999),
            selectGender2: pages.homePage.getRandomGender(),
            noMedicalCover: 'noThanks',
            noFlightCover: 'noThanks',
            addBagaggeCover: 'addFor'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for unbundled plan for 1 Adult, 1 Senior, 30 period, and 100K SI', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 1,
            travelStartDate: '01',
            travelEndDate: '01',
            travellerType1: "Adult",
            travellerType2: "Senior citizen",
            priceSet:'$100,000',
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
            yearOfDOB2: pages.homePage.randomNumber(1955, 1960),
            selectGender2: pages.homePage.getRandomGender(),
            allCovers: 'addFor',
            specializedContinue: 'specializedContinue'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for unbundled plan for 1 Adults, 1 Child, 10 days period, and 50K SI', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
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
            yearOfDOB2: pages.homePage.randomNumber(2015, 2023),
            selectGender2: pages.homePage.getRandomGender(),
            allCovers: 'addFor',
            specializedContinue: 'specializedContinue'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for unbundled plan for 1 Adults, 1 Senior, and 1 Child, 30 days period, 75K SI, and 6hrs', async()=>{
        let data = {
            clickOnCountry1 : "Indonesia",
            setMonth : 1,
            travelStartDate: '01',
            travelEndDate: '01',
            travellerType1: "Adult",
            travellerType2: "Child",
            travellerType3: "Senior citizen",
            priceSet:'$75,000',
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
            yearOfDOB2: pages.homePage.randomNumber(1955, 1960),
            selectGender2: pages.homePage.getRandomGender(),
            fullName3: "Self " + pages.homePage.randomName(4),
            dayOfDOB3: pages.homePage.randomNumber(3, 18),
            monthOfDOB3: pages.homePage.randomNumber(2, 9),
            yearOfDOB3: pages.homePage.randomNumber(2015, 2023),
            selectGender3: pages.homePage.getRandomGender(),
            allCovers: 'addFor',
            addHourForFlightCover: '6 hours',
            specializedContinue: 'specializedContinue'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('All cover names of medical cover in unbundled plan', async()=>{
        let data = {
            clickOnCountry1 : "United Kingdom",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
            travellerType1: "Adult",
            fullName1: "JOHN DOE",
            dayOfDOB1: pages.homePage.randomNumber(5, 20),
            monthOfDOB1: pages.homePage.randomNumber(2, 11),
            yearOfDOB1: pages.homePage.randomNumber(1990, 1999),
            selectGender1: pages.homePage.getRandomGender(),
            pincode: "560037",
            emailInput: 'nitin.kumar_eupho_blr@acko.tech',
            addMedicalCover: 'addFor',
            noFlightCover: 'noThanks',
            noBagaggeCover: 'noThanks',
            plans : [
                'Hospitalisation due to illness',
                'Hospitalisation due to accident',
                'Daily hospitalisation allowance',
                'Doctor consultation',
                'Death due to accident',
                'Total disability',
                'Partial disability',
                'Physiotherapy',
                'Emergency trip extension',
                'Emergency evacuation',
                'Travel expenses of immediate relative',
                'Repatriation of mortal remains in case of death'
            ]
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('All cover names of flight cover in unbundled plan', async()=>{
        let data = {
            clickOnCountry1 : "United Kingdom",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
            travellerType1: "Adult",
            fullName1: "JOHN DOE",
            dayOfDOB1: pages.homePage.randomNumber(5, 20),
            monthOfDOB1: pages.homePage.randomNumber(2, 11),
            yearOfDOB1: pages.homePage.randomNumber(1990, 1999),
            selectGender1: pages.homePage.getRandomGender(),
            pincode: "560037",
            emailInput: 'nitin.kumar_eupho_blr@acko.tech',
            noMedicalCover: 'noThanks',
            addFlightCover: 'addFor',
            noBagaggeCover: 'noThanks',
            plans : [
                'Flight delay',
                'Missed flight',
                'Trip cancellation',
                'Trip rescheduling',
                'Trip cancellation due to covid',
                'Missed connecting flight'
            ]
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('All cover names of baggage cover in unbundled plan', async()=>{
        let data = {
            clickOnCountry1 : "United Kingdom",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
            travellerType1: "Adult",
            fullName1: "JOHN DOE",
            dayOfDOB1: pages.homePage.randomNumber(5, 20),
            monthOfDOB1: pages.homePage.randomNumber(2, 11),
            yearOfDOB1: pages.homePage.randomNumber(1990, 1999),
            selectGender1: pages.homePage.getRandomGender(),
            pincode: "560037",
            emailInput: 'nitin.kumar_eupho_blr@acko.tech',
            noMedicalCover: 'noThanks',
            noFlightCover: 'noThanks',
            addBagaggeCover: 'addFor',
            plans : [
                'Delay of checked-in baggage',
                'Total loss of checked-in baggage',
                'Damage of checked-in baggage',
                'Loss of passport',
                'Home cover',
                'Legal liability'
            ]
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period 100K SI only medical cover for USA', async()=>{
        let data = {
            clickOnCountry1 : "United States of America (USA)",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
            travellerType1: "Adult",
            travellerType2: "Adult",
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
            yearOfDOB2: pages.homePage.randomNumber(1990, 1999),
            selectGender2: pages.homePage.getRandomGender(),
            addMedicalCover: 'addFor',
            noFlightCover: 'noThanks',
            noBagaggeCover: 'noThanks'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period 4 hrs only flight cover for Canada', async()=>{
        let data = {
            clickOnCountry1 : "Canada",
            setMonth : 0,
            travelStartDate: '01',
            travelEndDate: '10',
            travellerType1: "Adult",
            travellerType2: "Adult",
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
            yearOfDOB2: pages.homePage.randomNumber(1990, 1999),
            selectGender2: pages.homePage.getRandomGender(),
            noMedicalCover: 'noThanks',
            addHourForFlightCover: '4 hours',
            addFlightCover: 'addFor',
            noBagaggeCover: 'noThanks'
        }
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.addKYCSuccess(data.fullName1, mobileNumber);
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        let {startFormattedDate,endFormattedDate} = await pages.intlTravelInsurancePage.clickOnUnbundledPlan(data)
        await pages.paymentPage.sleep(2)
        await pages.paymentPage.completePayment()
        await pages.paymentPage.sleep(8)
        await pages.intlTravelInsurancePage.apiValidationUsingId({...data,startFormattedDate,endFormattedDate})
        await pages.paymentPage.sleep(1)
    })
})