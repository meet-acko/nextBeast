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
        await this.sleep(1)
        await this.clickElement(await this.findElement('option'))
        await this.sleep(1)
        await this.clickElement(await this.findElement('viewDetails'))
        await this.sleep(2)
        const pager = getPageLocators(data.pageName); 
        const heading = await this.getText(pager[data.headingCheck].xpath)
        const bookingId =  await this.getText(pager[data.bookingIdCheck].xpath)
        const visaPlanCheck =  await this.getText(pager[data.visaPlanCheck].xpath)
        const visaTypeCheck =  await this.getText(pager[data.visaTypeCheck].xpath)
        const bookingDateCheck =  await this.getText(pager[data.bookingDateCheck].xpath)
        const dateOfTravelCheck =  await this.getText(pager[data.dateOfTravelCheck].xpath)
        const dateOfReturnCheck = await this.getText(pager[data.dateOfReturnCheck].xpath)
        const nameCheck =  await this.getText(pager[data.nameCheck].xpath)
        const passportNumberCheck =  await this.getText(pager[data.passportNumberCheck].xpath)
        const categoryCheck =  await this.getText(pager[data.categoryCheck].xpath)

        //Validating heading
        const present = heading.includes(data.country)
        expect(present).toBe(true);

        //Validating bookingId
        let url = await this.getUrl();
        let id = await (url.split("/bookings/"))[1];
        if(bookingId.toLowerCase().trim() === id.toLowerCase().trim()) {
            console.log("Id's equal")
        } else {
            console.log("Id's not equal")
        }
        
        //Validating visaPlan
        if(data.package.toLowerCase().trim() === visaPlanCheck.toLowerCase().trim()){
            console.log("Visa plan equal")
        } else {
            console.log("Visa plan not equal")
        }

        //Validating visaType
        if(data.visaType.toLowerCase().trim() === visaTypeCheck.toLowerCase().trim()){
            console.log("Visa type equal")
        } else {
            console.log("Visa type not equal")
        }

        //Validating bookingDate
        if(this.getCurrentDateFormatted().toLowerCase().trim() === bookingDateCheck.toLowerCase().trim()){
            console.log("Booking date equal")
        } else {
            console.log("Booking date not equal")
        }

        //Validating travelDates
        const travelStartDate = this.formatDate(data.travelStartDate+' '+data.travelStartMonth+' '+data.travelStartYear)
        const travelEndDate = this.formatDate(data.travelEndDate+' '+data.travelEndMonth+' '+data.travelEndYear)
        if(travelStartDate.toLowerCase().trim() === dateOfTravelCheck.toLowerCase().trim() && 
            travelEndDate.toLowerCase().trim() === dateOfReturnCheck.toLowerCase().trim()){
            console.log("Travel dates equal")
        } else {
            console.log("Travel dates not equal")
        }

        //Validaitng name
        if(data.fullName.toLowerCase().trim() === nameCheck.toLowerCase().trim()){
            console.log("Name equal")
        } else {
            console.log("Name not equal")
        }

        //Validating passportNumber
        if(data.passportNumber.toLowerCase().trim() === passportNumberCheck.toLowerCase().trim()){
            console.log("Passport number equal")
        } else {
            console.log("Passport number not equal")
        }

        //Validating category
        if(this.getTravelerType(data.yearOfDOB).toLowerCase().trim() === categoryCheck.toLowerCase().trim()){
            console.log("Category equal")
        } else {
            console.log("Category not equal")
        }
    }
}

module.exports = VisaTravelInsurancePage;