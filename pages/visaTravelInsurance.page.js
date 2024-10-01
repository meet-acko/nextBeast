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
        await this.clickElement(await this.findElement('right',2))
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
        await this.clickElement(await this.findElement('calenderAttributes',2))
        const pager = getPageLocators(data.pageName);
        const locator = pager[data.locatorName].xpath;
        await this.compareAndPerformMonthAndYear(locator,data.dayOfDOB,data.monthOfDOB,data.yearOfDOB,'dob')
        await this.clickElement(await this.findElement('selectOccupation'))
        await this.clickElement(await this.findElement('occupationOption', data.occupation))
        await this.clickElement(await this.findElement('mobileInput'))
        await this.sendKeys(data.mobile)
        await this.clickElement(await this.findElement('email'))
        await this.sendKeys(data.email)
        await this.clickElement(await this.findElement('passportNumber'))
        await this.sendKeys(data.passportNumber)
        await this.clickElement(await this.findElement('passportExpiry'))
        await this.clickElement(await this.findElement('calenderAttributes',2))
        await this.compareAndPerformMonthAndYear(locator,data.dayOfExpiry,data.monthOfExpiry,data.yearOfExpiry,'expiry')
        await this.clickElement(await this.findElement('continue'))
        await this.clickElement(await this.findElement('continue'))
        await this.clickElement(await this.findElement('accept'))
        await this.clickElement(await this.findElement('pay',4))
    }

    async validationPart(data){
        await this.clickElement(await this.findElement('option'))
        await this.clickElement(await this.findElement('viewDetails'))
        const pager = getPageLocators(data.pageName);
        const heading =  await this.getText(pager[data.heading].xpath)
        const bookingId =  await this.getText(pager[data.bookingId].xpath)
        const visaPlanCheck =  await this.getText(pager[data.visaPlanCheck].xpath)
        const visaTypeCheck =  await this.getText(pager[data.visaTypeCheck].xpath)
        const bookingDateCheck =  await this.getText(pager[data.bookingDateCheck].xpath)
        const dateOfTravelCheck =  await this.getText(pager[data.dateOfTravelCheck].xpath)
        const dateOfReturnCheck =  await this.getText(pager[data.dateOfReturnCheck].xpath)
        const nameCheck =  await this.getText(pager[data.nameCheck].xpath)
        const passportNumberCheck =  await this.getText(pager[data.passportNumberCheck].xpath)
        const categoryCheck =  await this.getText(pager[data.categoryCheck].xpath)

        //Validating heading
        const present = heading.includes(data.country)
        expect(present).toBe(true);

        //Validating bookingId
        
    }
}

module.exports = VisaTravelInsurancePage;