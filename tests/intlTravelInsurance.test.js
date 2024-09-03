const HomePage = require("../pages/home.page");
const IntlTravelInsurancePage = require("../pages/intlTravelInsurance.page");

const pages={
    intlTravelInsurancePage : new IntlTravelInsurancePage(),
    homePage : new HomePage()
}

describe('International travel insurance test cases',()=>{
    it('VerifyintlTravelbuyjourneyforbundledplanfor1Adults&1Child10daysperiodand50KSI', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnBundledPlan()
        await pages.intlTravelInsurancePage.provideBundledPlanDetailsScenario3()
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('VerifyintlTravelbuyjourneyforbundledplanfor1Adults&1Senior120daysperiodand100KSI', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnBundledPlan()
        await pages.intlTravelInsurancePage.provideBundledPlanDetailsScenario2()
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('VerifyintlTravelbuyjourneyforbundledplanfor2Adults30daysperiodand200KSI', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnBundledPlan()
        await pages.intlTravelInsurancePage.provideBundledPlanDetailsScenario1()
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('VerifyintlTravelbuyjourneyforunbundledplanfor2Adults10daysperiod4hrsonlyflightcover', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan()
        await pages.intlTravelInsurancePage.provideBundledPlanDetailsScenario5()
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('VerifyintlTravelbuyjourneyforunbundledplanfor2Adults10daysperiod100KSIonlymedicalcover', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan()
        await pages.intlTravelInsurancePage.provideBundledPlanDetailsScenario7()
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('VerifyintlTravelbuyjourneyforunbundledplanfor2Adults10daysperiod100KSIonlymedicalcover', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan()
        await pages.intlTravelInsurancePage.provideBundledPlanDetailsScenario4()
        await pages.intlTravelInsurancePage.paymentProcess()
    })

    it('VerifyintlTravelbuyjourneyforunbundledplanfor2Adults10daysperiodandonlybaggagecover', async()=>{
        let mobileNumber=pages.homePage.randomMobileNumber()
        await pages.homePage.login(mobileNumber)
        await pages.homePage.sleep(3)
        await pages.intlTravelInsurancePage.clickOnUnbundledPlan()
        await pages.intlTravelInsurancePage.provideBundledPlanDetailsScenario6()
        await pages.intlTravelInsurancePage.paymentProcess()
    })
})