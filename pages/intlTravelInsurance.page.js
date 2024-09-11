const { properties } = require("../utils/config");
const { Helper } = require("../utils/helper");
const { URL } = require('url');
const axios = require('axios').default;

class IntlTravelInsurancePage extends Helper{
    constructor(){
        super(__filename);
    }

    async clickOnBundledPlan(data){
        await this.clickElement(await this.findElement('getTravel'))
        await this.sleep(1)
        await this.clickElement(await this.findElement('pickFromOurStandardPlans'))
        await this.sleep(1)
        await this.clickElement(await this.findElement('wherePlaceholder'))
        await this.clickElement(await this.findElement('clickOnCountry1',data.clickOnCountry1))
        await this.clickElement(await this.findElement('done'))
        await this.clickElement(await this.findElement('dateInput'))
        let currentDate = new Date();
        let nextMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        let targetDate = new Date(nextMonthDate);
        let newTargetDate =  targetDate.setMonth(targetDate.getMonth() + data.setMonth);
        let startFormattedDate = new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format(nextMonthDate)
        let endFormattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(newTargetDate);
        await this.clickElement(await this.findElement(data.firstOfMonth,startFormattedDate))
        await this.clickElement(await this.findElement(data.lastOfMonth,endFormattedDate))
        await this.clickElement(await this.findElement('addTravellerCount',data.travellerType1))
        await this.sleep(0.5)
        await this.clickElement(await this.findElement('addTravellerCount',data.travellerType2))
        await this.clickElement(await this.findElement('continueCTA'))
        await this.sleep(2)
        if('priceSet' in data)
        {
            await this.clickElement(await this.findElement('priceSet',data.priceSet))
        }
        await this.clickElement(await this.findElement('continueCTA'))
        await this.clickElement(await this.findElement('denailAddOn'))
        await this.clickElement(await this.findElement('continueCTA'))
        await this.sleep(1.5)
        await this.clickElement(await this.findElement('fullName',1))
        await this.sendKeys(data.fullName1)
        await this.clickElement(await this.findElement('dayOfDOB',1))
        await this.sendKeys(data.dayOfDOB1)
        await this.clickElement(await this.findElement('monthOfDOB',1))
        await this.sendKeys(data.monthOfDOB1)
        await this.clickElement(await this.findElement('yearOfDOB',1))
        await this.sendKeys(data.yearOfDOB1)
        await this.clickElement(await this.findElement('gender',1))
        await this.clickElement(await this.findElement('selectGender',data.selectGender1))
        await this.clickElement(await this.findElement('pincode',1))
        await this.sendKeys(data.pincode)
        await this.clickElement(await this.findElement('emailInput',1))
        await this.sendKeys(data.emailInput)
        await this.clickElement(await this.findElement('fullName',2))
        await this.sendKeys(data.fullName2)
        await this.clickElement(await this.findElement('dayOfDOB',2))
        await this.sendKeys(data.dayOfDOB2)
        await this.clickElement(await this.findElement('monthOfDOB',2))
        await this.sendKeys(data.monthOfDOB2)
        await this.clickElement(await this.findElement('yearOfDOB',2))
        await this.sendKeys(data.yearOfDOB2)
        await this.clickElement(await this.findElement('gender',2))
        await this.clickElement(await this.findElement('selectGender',data.selectGender2))
        await this.clickElement(await this.findElement('continueCTA'))
        if('specializedContinue' in data)
        {
            await this.clickElement(await this.findElement(data.specializedContinue))
        }
        await this.sleep(1.5)
        await this.clickElement(await this.findElement('paySecurely'))
        return {nextMonthDate,newTargetDate}
    }

    async clickOnUnbundledPlan(data){
        await this.clickElement(await this.findElement('getTravel'))
        await this.clickElement(await this.findElement('unbundledPlan'))
        await this.clickElement(await this.findElement('wherePlaceholder'))
        await this.clickElement(await this.findElement('clickOnCountry1',data.clickOnCountry1))
        await this.clickElement(await this.findElement('done'))
        await this.clickElement(await this.findElement('dateInput'))
        let currentDate = new Date();
        let nextMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        let targetDate = new Date(nextMonthDate);
        let newTargetDate =  targetDate.setMonth(targetDate.getMonth() + data.setMonth);
        let startFormattedDate = new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format(nextMonthDate)
        let endFormattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(newTargetDate);
        await this.clickElement(await this.findElement(data.firstOfMonth,startFormattedDate))
        await this.clickElement(await this.findElement(data.lastOfMonth,endFormattedDate))
        await this.clickElement(await this.findElement('addTravellerCount',data.travellerType1))
        await this.sleep(0.5)
        await this.clickElement(await this.findElement('addTravellerCount',data.travellerType2))
        await this.clickElement(await this.findElement('continueCTA'))
        await this.sleep(0.5)
        await this.clickElement(await this.findElement('continueCTA'))
        if('addForOnlyMedicalCover' in data)
        {
            await this.clickElement(await this.findElement(data.addForOnlyMedicalCover,1))
            await this.sleep(0.5)
            await this.clickElement(await this.findElement(data.addForOnlyMedicalCover,2))
            await this.sleep(0.5)
        }
        if('addForAllCovers' in data)
        {
            await this.clickElement(await this.findElement(data.addForAllCovers,1))
            await this.sleep(0.5)
            await this.clickElement(await this.findElement(data.addForAllCovers,2))
            await this.sleep(0.5)
            if('flightHoursWithAllCovers' in data)
            {
                await this.clickElement(await this.findElement('hours',data.flightHoursWithAllCovers))
            }
            await this.sleep(0.5)
            await this.clickElement(await this.findElement(data.addForAllCovers,1))
            await this.sleep(0.5)
            await this.clickElement(await this.findElement(data.addForAllCovers,1))
        }
        if('noThanksMedicalCover' in data)
        {
            await this.clickElement(await this.findElement(data.noThanksMedicalCover,1))
            await this.sleep(0.5)
        }
        if('noThanksMissedMedicalCover' in data)
        {
            await this.clickElement(await this.findElement(data.noThanksMissedMedicalCover,2))
        }
        if('flightHoursOnlyFlightCover' in data)
        {
            await this.clickElement(await this.findElement('hours',data.flightHoursOnlyFlightCover))
        }
        if('addForOnlyFlightCover' in data)
        {
            await this.clickElement(await this.findElement(data.addForOnlyFlightCover,1))
        }
        if('noThanksFlightCover' in data)
        {
            await this.clickElement(await this.findElement(data.noThanksFlightCover,1))
        }
        if('addForBagaggeCover' in data)
        {
            await this.sleep(1)
            await this.clickElement(await this.findElement(data.addForBagaggeCover,1))
        }
        if('noThanksBagaggeCover' in data)
        {
            await this.sleep(0.5)
            await this.clickElement(await this.findElement(data.noThanksBagaggeCover,1))
        }
        await this.sleep(1)
        await this.clickElement(await this.findElement('fullName',1))
        await this.sendKeys(data.fullName1)
        await this.clickElement(await this.findElement('dayOfDOB',1))
        await this.sendKeys(data.dayOfDOB1)
        await this.clickElement(await this.findElement('monthOfDOB',1))
        await this.sendKeys(data.monthOfDOB1)
        await this.clickElement(await this.findElement('yearOfDOB',1))
        await this.sendKeys(data.yearOfDOB1)
        await this.clickElement(await this.findElement('gender',1))
        await this.clickElement(await this.findElement('selectGender',data.selectGender1))
        await this.clickElement(await this.findElement('pincode',1))
        await this.sendKeys(data.pincode)
        await this.clickElement(await this.findElement('emailInput',1))
        await this.sendKeys(data.emailInput)
        await this.clickElement(await this.findElement('fullName',2))
        await this.sendKeys(data.fullName2)
        await this.clickElement(await this.findElement('dayOfDOB',2))
        await this.sendKeys(data.dayOfDOB2)
        await this.clickElement(await this.findElement('monthOfDOB',2))
        await this.sendKeys(data.monthOfDOB2)
        await this.clickElement(await this.findElement('yearOfDOB',2))
        await this.sendKeys(data.yearOfDOB2)
        await this.clickElement(await this.findElement('gender',2))
        await this.clickElement(await this.findElement('selectGender',data.selectGender2))
        await this.clickElement(await this.findElement('continueCTA'))
        await this.clickElement(await this.findElement('paySecurely'))
    }

    async apiValidationUsingId(data){
        await this.sleep(2)
        let url = await this.getUrl();
        let id = await (url.split("/pdp/"))[1];
        let idAgain = await (id.split("?utm_"))[0]
        await console.log(idAgain);
        const tokenUrl = 'https://central-auth-uat.internal.ackodev.com/realms/SureOs-dev/protocol/openid-connect/token';
        const tokenHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const tokenData = new URLSearchParams({
            client_id: '5ad728b0-733f-44a7-987e-b946e7273341',
            grant_type: 'client_credentials',
            client_secret: 'DWhtLhXzdZln4EQZ91ne5QRzdPg1QKEv',
            scope: 'openid'
        }).toString();

        try {
            // Request the authentication token
            const tokenResponse = await axios.post(tokenUrl, tokenData, { headers: tokenHeaders });
            const token = tokenResponse.data.access_token;

            // Log the token for debugging purposes
            console.log(`Token: ${token}`);
            let mUrl = "https://sureos-policy-service.internal.ackodev.com/policy-service/v1/policies/" + idAgain;
            let apiResponse = await axios.get(mUrl, {
                              headers: {
                                'Authorization': `Bearer ${token}`
                              }   
                        })
            console.log(apiResponse.data)
            if(apiResponse.data.header.proposal_data.travel_start_date === data.nextMonthDate)
            {
                console.log(apiResponse.data.header.proposal_data.travel_start_date)
                console.log(data.nextMonthDate)
                console.log('Date is matching')
            }
            else
            {
                console.log(apiResponse.data.header.proposal_data.travel_start_date)
                console.log(data.nextMonthDate)
                console.log('Date not matching')
            }
            
        }
        catch (error) {
            // Handle any errors that occurred during the requests
            console.error('Error:', error.message);
        }
    }
}

module.exports = IntlTravelInsurancePage;