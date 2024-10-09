const { properties } = require("../utils/config");
const { Helper } = require("../utils/helper");
const axios = require('axios').default;
const moment = require('moment');
const { expect } = require('@playwright/test')


class IntlTravelInsurancePage extends Helper{
    constructor(){
        super(__filename);
    }

    async clickOnBundledPlan(data){
        await this.clickElement(await this.findElement('getTravel'))
        await this.clickElement(await this.findElement('getIntlTravelInsurance'))
        await this.clickElement(await this.findElement('pickFromOurStandardPlans'))
        await this.clickElement(await this.findElement('wherePlaceholder'))
        const countriesFromInput = Object.entries(data).filter(([key, value]) => key.includes('clickOnCountry'))
            .map(([key, value]) => value.trim());
        for (const clickOnCountry of countriesFromInput) {
            const element = await this.findElement('clickOnCountry', clickOnCountry);
            await this.clickElement(element);
            await this.sleep(0.5);
        }
        await this.clickElement(await this.findElement('done'))
        await this.clickElement(await this.findElement('dateInput'))
        let currentDate = new Date();
        let nextMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        let targetDate = new Date(nextMonthDate);
        let newTargetDate =  targetDate.setMonth(targetDate.getMonth() + data.setMonth);
        let startFormattedDate = new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format(nextMonthDate)
        let endFormattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(newTargetDate);
        await this.clickElement(await this.findElement(data.travelStartDate,startFormattedDate))
        await this.clickElement(await this.findElement(data.travelEndDate,endFormattedDate))
        const travellerTypesFromInput = Object.entries(data).filter(([key, value]) => key.includes('travellerType'))
            .map(([key, value]) => value.trim());
        for (const travellerType of travellerTypesFromInput) {
            const element = await this.findElement('addTravellerCount', travellerType);
            await this.clickElement(element);
            await this.sleep(0.5);
        }
        await this.clickElement(await this.findElement('continueCTA'))
        await this.sleep(2)
        if('priceSet' in data){
            await this.clickElement(await this.findElement('priceSet',data.priceSet))
        }
        if('covers' in data){
            switch (data.covers) {
                case 'Standard':
                    await this.clickElement(await this.findElement('coversSelection',data.covers))
                    break;
                case 'Comfort':
                    await this.clickElement(await this.findElement('coversSelection',data.covers))
                    break;
            }
        }
        await this.clickElement(await this.findElement('continueCTA'))
        await this.clickElement(await this.findElement('denailAddOn'))
        await this.clickElement(await this.findElement('continueCTA'))
        await this.sleep(1.5)
        const fullNameFromInput = Object.entries(data).filter(([key, value]) => key.includes('fullName'))
            .map(([key, value]) => value);
        const dayFromInput = Object.entries(data).filter(([key, value]) => key.includes('dayOfDOB'))
            .map(([key, value]) => value);
        const monthFromInput = Object.entries(data).filter(([key, value]) => key.includes('monthOfDOB'))
            .map(([key, value]) => value);
        const yearFromInput = Object.entries(data).filter(([key, value]) => key.includes('yearOfDOB'))
            .map(([key, value]) => value);
        const genderFromInput = Object.entries(data).filter(([key, value]) => key.includes('selectGender'))
            .map(([key, value]) => value);
        const pincodeFromInput = Object.entries(data).filter(([key, value]) => key.includes('pincode'))
            .map(([key, value]) => value);
        const emailFromInput = Object.entries(data).filter(([key, value]) => key.includes('emailInput'))
            .map(([key, value]) => value);
        for (let i = 0; i < fullNameFromInput.length; i++) {
            await this.clickElement(await this.findElement('fullName', i + 1));
            await this.sendKeys(fullNameFromInput[i]);
            await this.clickElement(await this.findElement('dayOfDOB', i + 1));
            await this.sendKeys(dayFromInput[i]);
            await this.clickElement(await this.findElement('monthOfDOB', i + 1));
            await this.sendKeys(monthFromInput[i]);
            await this.clickElement(await this.findElement('yearOfDOB', i + 1));
            await this.sendKeys(yearFromInput[i]);
            await this.clickElement(await this.findElement('gender', i + 1));
            await this.clickElement(await this.findElement('selectGender', genderFromInput[i]))
            if(pincodeFromInput[i]){
                await this.clickElement(await this.findElement('pincode', i + 1));
                await this.sendKeys(pincodeFromInput[i]);
            }
            if(emailFromInput[i]){
                await this.clickElement(await this.findElement('emailInput', i + 1));
                await this.sendKeys(emailFromInput[i]);
            }
        }
        await this.clickElement(await this.findElement('continueCTA'))
        if('specializedContinue' in data){
            await this.clickElement(await this.findElement(data.specializedContinue))
        }
        await this.sleep(1.5)
        await this.clickElement(await this.findElement('paySecurely'))
        return {startFormattedDate,endFormattedDate}
    }

    async clickOnUnbundledPlan(data){
        await this.clickElement(await this.findElement('getTravel'))
        // await this.clickElement(await this.findElement('getIntlTravelInsurance'))
        await this.clickElement(await this.findElement('unbundledPlan'))
        await this.clickElement(await this.findElement('wherePlaceholder'))
        const countriesFromInput = Object.entries(data).filter(([key, value]) => key.includes('clickOnCountry'))
            .map(([key, value]) => value.trim());
        for (const clickOnCountry of countriesFromInput) {
            const element = await this.findElement('clickOnCountry', clickOnCountry);
            await this.clickElement(element);
            await this.sleep(0.5);
        }
        await this.clickElement(await this.findElement('done'))
        await this.clickElement(await this.findElement('dateInput'))
        let currentDate = new Date();
        let nextMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        let targetDate = new Date(nextMonthDate);
        let newTargetDate =  targetDate.setMonth(targetDate.getMonth() + data.setMonth);
        let startFormattedDate = new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format(nextMonthDate)
        let endFormattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(newTargetDate);
        await this.clickElement(await this.findElement(data.travelStartDate,startFormattedDate))
        await this.clickElement(await this.findElement(data.travelEndDate,endFormattedDate))
        const travellerTypesFromInput = Object.entries(data).filter(([key, value]) => key.includes('travellerType'))
            .map(([key, value]) => value.trim());
        for (const travellerType of travellerTypesFromInput) {
            const element = await this.findElement('addTravellerCount', travellerType);
            await this.clickElement(element);
            await this.sleep(0.5);
        }
        await this.clickElement(await this.findElement('continueCTA'))
        await this.sleep(0.5)
        //await this.clickElement(await this.findElement('continueCTA'))
        if ('addMedicalCover' in data) {
            await this.handleClick(data.addMedicalCover, 1);
            await this.handleClick(data.addMedicalCover, 2);
            await this.handleClick(data.noFlightCover, 1);
            await this.handleClick(data.noBagaggeCover, 1);
        }     
        if ('allCovers' in data) {
            await this.handleClick('priceSet', data.priceSet);
            await this.handleClick(data.allCovers, 1);
            await this.handleClick(data.allCovers, 2);
            if ('addHourForFlightCover' in data) {
                await this.clickElement(await this.findElement('hours', data.addHourForFlightCover))
            }
            await this.handleClick(data.allCovers, 1);
            await this.handleClick(data.allCovers, 1);
        }
        if('addFlightCover' in data){
            await this.handleClick(data.noMedicalCover, 1);
            await this.handleClick(data.noMedicalCover, 2);
            if ('addHourForFlightCover' in data) {
                await this.clickElement(await this.findElement('hours', data.addHourForFlightCover))
            }
            await this.handleClick(data.addFlightCover, 1);
            await this.handleClick(data.noBagaggeCover, 1);
        }
        if ('addBagaggeCover' in data) {
            await this.sleep(1);
            await this.handleClick(data.noMedicalCover, 1);
            await this.handleClick(data.noMedicalCover, 2);
            await this.handleClick(data.noFlightCover, 1);
            await this.handleClick(data.addBagaggeCover, 1);
        }
        await this.sleep(1)
        const fullNameFromInput = Object.entries(data).filter(([key, value]) => key.includes('fullName'))
            .map(([key, value]) => value);
        const dayFromInput = Object.entries(data).filter(([key, value]) => key.includes('dayOfDOB'))
            .map(([key, value]) => value);
        const monthFromInput = Object.entries(data).filter(([key, value]) => key.includes('monthOfDOB'))
            .map(([key, value]) => value);
        const yearFromInput = Object.entries(data).filter(([key, value]) => key.includes('yearOfDOB'))
            .map(([key, value]) => value);
        const genderFromInput = Object.entries(data).filter(([key, value]) => key.includes('selectGender'))
            .map(([key, value]) => value);
        const pincodeFromInput = Object.entries(data).filter(([key, value]) => key.includes('pincode'))
            .map(([key, value]) => value);
        const emailFromInput = Object.entries(data).filter(([key, value]) => key.includes('emailInput'))
            .map(([key, value]) => value);
        for (let i = 0; i < fullNameFromInput.length; i++) {
            await this.clickElement(await this.findElement('fullName', i + 1));
            await this.sendKeys(fullNameFromInput[i]);
            await this.clickElement(await this.findElement('dayOfDOB', i + 1));
            await this.sendKeys(dayFromInput[i]);
            await this.clickElement(await this.findElement('monthOfDOB', i + 1));
            await this.sendKeys(monthFromInput[i]);
            await this.clickElement(await this.findElement('yearOfDOB', i + 1));
            await this.sendKeys(yearFromInput[i]);
            await this.clickElement(await this.findElement('gender', i + 1));
            await this.clickElement(await this.findElement('selectGender', genderFromInput[i]))
            if(pincodeFromInput[i]){
                await this.clickElement(await this.findElement('pincode', i + 1));
                await this.sendKeys(pincodeFromInput[i]);
            }
            if(emailFromInput[i]){
                await this.clickElement(await this.findElement('emailInput', i + 1));
                await this.sendKeys(emailFromInput[i]);
            }
        }
        await this.clickElement(await this.findElement('continueCTA'))
        try{
            if (await this.findElement('updatedPrice')) {
                if('specializedContinue' in data){
                    await this.clickElement(await this.findElement(data.specializedContinue))
                }
            }
            await this.clickElement(await this.findElement('paySecurely'));
        }
        catch(error){
            await this.clickElement(await this.findElement('paySecurely'));
        }
        return {startFormattedDate,endFormattedDate}
    }

    async apiValidationUsingId(data){
        await this.sleep(2)
        let url = await this.getUrl();
        let id = await (url.split("/pdp/"))[1];
        await this.sleep(1)
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

            // Get the token and hit endpoint with tokenusing id
            console.log(`Token: ${token}`);
            let mUrl = "https://sureos-policy-service.internal.ackodev.com/policy-service/v1/policies/" + idAgain;
            let apiResponse = await axios.get(mUrl, {
                              headers: {
                                'Authorization': `Bearer ${token}`
                              }   
                        })

            //Validating policy id
            const policyIdFromAPI = apiResponse.data.header.policy_id
            expect(idAgain).toBe(policyIdFromAPI)

            //Validating travel start dates
            const travelStartDateFromAPI = moment(apiResponse.data.header.proposal_data.travel_start_date, "DD-MM-YYYY");
            const travelStartDateFromInput = moment(data.travelStartDate+data.startFormattedDate, "DDMMMM YYYY");
            if (travelStartDateFromAPI.isSame(travelStartDateFromInput, 'day')) {
                console.log('The travel start dates are equal.');
            } else {
                console.log('The travel start dates are not equal.');
            }

            //Validating travel end dates
            const travelEndDateFromAPI = moment(apiResponse.data.header.proposal_data.travel_end_date, "DD-MM-YYYY");
            const travelEndDateFromInput = moment(data.travelEndDate+data.endFormattedDate, "DDMMMM YYYY");
            if (travelEndDateFromAPI.isSame(travelEndDateFromInput, 'day')) {
                console.log('The travel end dates are equal.');
            } else {
                console.log('The travel end dates are not equal.');
            }

            //Validating country name
            const countryKeys = Object.keys(data).filter(key => key.startsWith('clickOnCountry'));
            const countryValues = countryKeys.map(key => data[key]);
            const countryList = apiResponse.data.header.proposal_data.country_list;
            const countryNames = countryList.map(country => country.name);
            countryValues.forEach(country => {
                expect(countryNames).toContain(country);
            });

            //Validating Child, Adult and Senior citizen count
            const insuredCategories = apiResponse.data.header.proposal_data.insured_category_list
            let childCountFromAPI = 0, adultCountFromAPI = 0, seniorCitizenCountFromAPI = 0;
            insuredCategories.forEach(category => {
            switch (category.category) {
                case 'CHILD':
                    childCountFromAPI = category.count;
                    break;
                case 'ADULT':
                    adultCountFromAPI = category.count;
                    break;
                case 'SENIOR_CITIZEN':
                    seniorCitizenCountFromAPI = category.count;
                    break;
                }
            });
            const travellerTypes = await this.travellerTypeCount(data)
            const counts = {};
            travellerTypes.forEach(type => {
                if (counts[type]) {
                    counts[type]++;
                } else {
                    counts[type] = 1;
                }
            });
            const childCountFromInput = counts['Child'] ?? 0
            const adultCountFromInput = counts['Adult'] ?? 0
            const seniorCitizenCountFromInput = counts['Senior citizen'] ?? 0
            expect(childCountFromInput).toBe(childCountFromAPI)
            expect(adultCountFromInput).toBe(adultCountFromAPI)
            expect(seniorCitizenCountFromInput).toBe(seniorCitizenCountFromAPI)

            //Validating the name
            const fullNamesFromAPI = apiResponse.data.insured.map(item => item.parameters.full_name.value.trim());
            let fullNamesFromInput = Object.entries(data).filter(([key, value]) => key.includes('fullName'))
            .map(([key, value]) => value.trim());
            if (fullNamesFromAPI.length !== fullNamesFromInput.length) {
                return false;
            }
            const sortedArr1 = fullNamesFromAPI.slice().sort();
            const sortedArr2 = fullNamesFromInput.slice().sort();
            if (sortedArr1.length !== sortedArr2.length) {
                console.log("Lengths are not same")
            }
            for (let i = 0; i < sortedArr1.length; i++) {
                if (sortedArr1[i] !== sortedArr2[i]) {
                    console.log("Not equal")
                }
            }
            
            //Validating DOB
            const dobsFromAPI = apiResponse.data.insured.map(item => item.parameters.dob.value.trim());
            let dobsFromInput = [];
            for (let key in data) {
                if (key.startsWith('dayOfDOB')) {
                    let index = key.replace('dayOfDOB', '');
                    let day = data[key];
                    let month = data['monthOfDOB' + index];
                    let year = data['yearOfDOB' + index];
                    if (day !== undefined && month !== undefined && year !== undefined) {
                        dobsFromInput.push(await this.formatDOB(day, month, year));
                    }
                }
            }
            if (fullNamesFromAPI.length !== fullNamesFromInput.length) {
                return false;
            }
            const sortArr1 = dobsFromInput.slice().sort();
            const sortArr2 = dobsFromAPI.slice().sort();
            if (sortArr1.length !== sortArr2.length) {
                console.log("Lengths are not same")
            }
            for (let i = 0; i < sortArr1.length; i++) {
                if (sortArr1[i] !== sortArr2[i]) {
                    console.log("Not equal")
                }
            }

            //Validating the genders
            const gendersFromAPI = apiResponse.data.insured.map(item => item.parameters.gender.value.trim().toLowerCase());
            let gendersFromInput = [];
            for (let key in data) {
                if (key.includes('selectGender')) {
                    gendersFromInput.push(data[key].trim().toLowerCase());
                }
            }
            if (gendersFromAPI.length !== gendersFromInput.length) {
                return false;
            }
            const sortA1 = gendersFromAPI.slice().sort();
            const sortA2 = gendersFromInput.slice().sort();
            if (sortA1.length !== sortA2.length) {
                console.log("Lengths are not same")
            }
            for (let i = 0; i < sortA2.length; i++) {
                if (sortA1[i] !== sortA2[i]) {
                    console.log("Not equal")
                }
            }

            //Validating the email
            const emailFromAPI = apiResponse.data.insured
            .map(item => item.parameters.email.value.trim())
            .filter(email => email !== '')
            let emailFromInput = [];
            for (let key in data) {
                if (key.includes('emailInput')) {
                    emailFromInput.push(data[key].trim().toLowerCase());
                }
            }
            if (emailFromAPI.length !== emailFromInput.length) {
                return false;
            }
            const sortAr1 = emailFromAPI.slice().sort();
            const sortAr2 = emailFromInput.slice().sort();
            if (sortAr1.length !== sortAr2.length) {
                console.log("Lengths are not same")
            }
            for (let i = 0; i < sortAr2.length; i++) {
                if (sortAr1[i] !== sortAr2[i]) {
                    console.log("Not equal")
                }
            }
            
            //Validating the pincode
            const pincodeFromAPI = apiResponse.data.insured
            .map(item => item.parameters.pin_code.value.trim())
            .filter(pincode => pincode !== '0')
            let pincodeFromInput = [];
            for (let key in data) {
                if (key.includes('pincode')) {
                    pincodeFromInput.push(data[key].trim().toLowerCase());
                }
            }
            if (pincodeFromAPI.length !== pincodeFromInput.length) {
                return false;
            }
            const sortAry1 = pincodeFromAPI.slice().sort();
            const sortAry2 = pincodeFromInput.slice().sort();
            if (sortAry1.length !== sortAry2.length) {
                console.log("Lengths are not same")
            }
            for (let i = 0; i < sortAry2.length; i++) {
                if (sortAry1[i] !== sortAry2[i]) {
                    console.log("Not equal")
                }
            }

            //Validating the covers
            const covers = [];
            apiResponse.data.plans.forEach(plan => {
                plan.insured_mapping.forEach(mapping => {
                    for (let coverName in mapping.covers) {
                        covers.push(coverName);
                    }
                });
            });
            const set1 = new Set(data.plans);
            const set2 = new Set(covers);
            if (set1.size !== set2.size) console.log("Array Lengths are not same")
            for (let item of set1) {
                if (!set2.has(item)){ 
                    console.log("Arrays are not same")
                    break
                }
            }
        }
        catch (error) {
            // Handle any errors that occurred during the requests
            console.error('Error:', error.message);
        }
    }
}

module.exports = IntlTravelInsurancePage;