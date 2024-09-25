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
        
    }

}

module.exports = PassTravelInsurancePage;