const { properties } = require("../utils/config");
const { Helper } = require("../utils/helper");
const axios = require('axios').default;
const moment = require('moment');
const { expect } = require('@playwright/test')

class PassTravelInsurancePage extends Helper{
    constructor(){
        super(__filename);
    }

    async buyPassTravelInsurance(data) {
        await this.clickElement(await this.findElement('getTravel'))
        await this.setUrl('https://www.ackodev.com/t/travel')
        await this.clickElement(await this.findElement('travelPass'))
        await this.clickElement(await this.findElement('canIAddMyFamilyMembersToMyPass'))
        await this.clickElement(await this.findElement('getItFor'))
        await this.clickElement(await this.findElement('fullName'))
        await this.sendKeys(data.fullName)
        await this.clickElement(await this.findElement('pincode'))
        await this.sendKeys(data.pincode)
        await this.clickElement(await this.findElement('email'))
        await this.sendKeys(data.email)
        await this.clickElement(await this.findElement('continue'))
    }

    async addAddressForBuyPassTravelInsurance(data) {
        await this.clickElement(await this.findElement('addAddress',2))
        await this.clickElement(await this.findElement('flatNo'))
        await this.sendKeys(data.flatNo)
        await this.clickElement(await this.findElement('street'))
        await this.sendKeys(data.street)
        await this.clickElement(await this.findElement('city'))
        await this.sendKeys(data.city)
        await this.clickElement(await this.findElement('state'))
        await this.sendKeys(data.state)
        await this.clickElement(await this.findElement('pincode'))
        await this.sendKeys(data.pincode)
        await this.clickElement(await this.findElement('save',3))
    }

    async apiValidationForBuyPassTravelInsurance(data) {
        
    }

}

module.exports = PassTravelInsurancePage;