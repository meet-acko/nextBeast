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
        await pages.intlTravelInsurancePage.clickOnBundledPlan()
        await pages.intlTravelInsurancePage.buy_journey_for_1_Adults_and_1_Child_10_days_period_and_50K_SI()
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('Intl Travel buy journey for bundled plan for 1 Adults & 1 Senior 120 days period and 100K SI', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnBundledPlan()
        await pages.intlTravelInsurancePage.buy_journey_for_1_Adults_and_1_Senior_120_days_period_and_100K_SI()
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('Intl Travel buy journey for bundled plan for 2 Adults 30days period and 200K SI', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnBundledPlan()
        await pages.intlTravelInsurancePage.buy_journey_for_2_Adults_30_days_period_and_200K_SI()
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period 4 hrs only flight cover', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan()
        await pages.intlTravelInsurancePage.buy_journey_for_2_Adults_10_days_period_4hrs_only_flight_cover()
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period 100K SI only medical cover', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan()
        await pages.intlTravelInsurancePage.buy_journey_for_2_Adults_10_days_period_100K_SI_4hrs_and_all_covers()
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period 100K SI only medical cover', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan()
        await pages.intlTravelInsurancePage.buy_journey_for_2_Adults_10_days_period_100K_SI_only_medical_cover()
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('Intl Travel buy journey for unbundled plan for 2 Adults 10 days period and only baggage cover', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan()
        await pages.intlTravelInsurancePage.buy_journey_for_2_Adults_10_days_period_and_only_baggage_cover()
        await pages.intlTravelInsurancePage.paymentProcess()
    })
})