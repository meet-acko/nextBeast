const { properties } = require("../utils/config");
const { Helper } = require("../utils/helper");
const axios = require('axios').default;
const moment = require('moment');
const { expect } = require('@playwright/test')
const getPageLocators = (pageName) => {
    const path = `../locators/${pageName}.page.json`;
    return require(path);
};

class VisaTravelInsurancePage extends Helper{
    constructor(){
        super(__filename);
    }

    async buyVisaTravelInsurance(data) {
        await this.clickElement(await this.findElement('getTravel'))
        await this.setUrl('https://www.ackodev.com/t/travel')
        await this.clickElement(await this.findElement('visa',1))
        await this.clickElement(await this.findElement('whereAreYouPlanningToGo'))
        await this.sendKeys(data.country)
        await this.clickElement(await this.findElement('countrySuggestion', data.country))
        await this.clickElement(await this.findElement('countrySuggestion', data.country))
        await this.clickElement(await this.findElement('visaType', data.visaType))
        await this.clickElement(await this.findElement('continue'))
        await this.clickElement(await this.findElement('select',data.package))
        await this.clickElement(await this.findElement('continue'))
        await this.clickElement(await this.findElement(data.travelStartDate,data.travelStartMonth))
        for(let i=0;i<data.setMonth;i++){
            await this.clickElement(await this.findElement('right',2))
        }
        await this.clickElement(await this.findElement(data.travelEndDate, data.travelEndMonth))
        await this.clickElement(await this.findElement('setDates'))
        await this.clickElement(await this.findElement('continue'))
        await this.clickElement(await this.findElement('firstName'))
        await this.sendKeys(data.fullName)
        await this.clickElement(await this.findElement('selectGender'))
        await this.clickElement(await this.findElement('maleOption',data.gender))
        await this.clickElement(await this.findElement('dob'))
        await this.clickElement(await this.findElement('dobAttributes',2))
        const pager = getPageLocators(data.pageName);
        const locator = pager[data.locatorName].xpath;
        await this.compareAndPerformYear(locator,data.yearOfDOB)
        // await this.clickElement(await this.findElement('selectOccupation'))
        // await this.clickElement(await this.findElement('occupationOption', data.occupation))
        // await this.clickElement(await this.findElement('mobileInput'))
        // await this.sendKeys(data.mobile)
        // await this.clickElement(await this.findElement('email'))
        // await this.sendKeys(data.email)
        // await this.clickElement(await this.findElement('passportNumber'))
        // await this.sendKeys(data.passportNumber)
    }
}

module.exports = VisaTravelInsurancePage;