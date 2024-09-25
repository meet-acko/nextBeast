const { properties } = require("../utils/config");
const { Helper } = require("../utils/helper");
const axios = require('axios').default;
const moment = require('moment');
const { expect } = require('@playwright/test')

class VisaTravelInsurancePage extends Helper{
    constructor(){
        super(__filename);
    }

    async buyVisaTravelInsurance(data) {
        await this.clickElement(await this.findElement('getTravel'))
        await this.clickElement(await this.findElement('visa',1))
    }
}

module.exports = VisaTravelInsurancePage;