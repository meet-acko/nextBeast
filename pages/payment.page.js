const { properties } = require("../utils/config");
const { Helper } = require("../utils/helper");

class PaymentPage extends Helper{
    constructor(){
        super(__filename);
    }

    async completePayment(paymentMethod="yearly", timeOut=100){
        await this.sleep(3);
        let startTime = await (new Date()).getTime();
        let endTime = await startTime + (timeOut*1000);
        if(await properties.isMockPaymentEnabled){
            while(!await this.switchToMatchingURLWindow("simulator", false) && await ((new Date()).getTime() < endTime)){
                await this.sleep(2);
                if(await this.switchToMatchingURLWindow("simulator", false)){
                    await this.sleep(1);
                    break;
                }
            }
            let netBankingCTA = await this.findElement("successMockCTA", "", 50);
            await this.clickElement(await netBankingCTA); 
        }else{
            switch (paymentMethod) {
                case "yearly" : {
                    await this.switchContext("native");
                    let netBankingCTA = await this.findElement("netBankingCTA", "", 50);
                    await this.clickElement(await netBankingCTA);
                    let hdfcBankCTA = await this.findElement("hdfcBankCTA");
                    await this.clickElement(await hdfcBankCTA);
                    let netBankingUsername = await this.findElement("netBankingUsername");
                    await this.setElement(await netBankingUsername, "payu");
                    let paymentPassword = await this.findElement("paymentPassword");
                    await this.setElement(await paymentPassword, "payu");
                    let submitCTA = await this.findElement("submitCTA");
                    await this.clickElement(await submitCTA);
                    let successSimulateCTA = await this.findElement("successSimulateCTA");
                    await this.clickElement(await successSimulateCTA);
                    }
                    break;

                case "monthly" : {
                    let cardPaymentOption = await this.findElement("cardPaymentOption", "", 50);
                    await this.clickElement(await cardPaymentOption);
                    let cardNumberInput = await this.findElement("cardNumberInput");
                    await this.setElement(await cardNumberInput, "4761360079851258");
                    let expiryDateInput = await this.findElement("expiryDateInput");
                    await this.setElement(await expiryDateInput, "1126");
                    let cvvInput = await this.findElement("cvvInput");
                    await this.setElement(await cvvInput, "123");
                    let cardPayBtn = await this.findElement("cardPayBtn");
                    await this.clickElement(await cardPayBtn);
                    let secureAndPayBtn = await this.findElement("secureAndPayBtn");
                    await this.clickElement(await secureAndPayBtn);
                    paymentPassword = await this.findElement("paymentPassword");
                    await this.clickElement(await paymentPassword);
                    await this.sendKeys("123456");
                    let submitOTPBtn = await this.findElement("submitOTPBtn");
                    await this.clickElement(await submitOTPBtn);
                    }
                    break;
                default:
                    await this.sleep(15);
                    break;
            }
            await this.sleep(7);
        }
        // yearly payment
        // await this.sleep(20);
        // monthly payment
        // let cardPaymentOption = await this.findElement("cardPaymentOption");
        // await this.clickElement(await cardPaymentOption);
        // let cardNumberInput = await this.findElement("cardNumberInput");
        // await this.setElement(await cardNumberInput, "4761360079851258");
        // let expiryDateInput = await this.findElement("expiryDateInput");
        // await this.setElement(await expiryDateInput, "1126");
        // let cvvInput = await this.findElement("cvvInput");
        // await this.setElement(await cvvInput, "123");
        // let cardPayBtn = await this.findElement("cardPayBtn");
        // await this.clickElement(await cardPayBtn);
        // let secureAndPayBtn = await this.findElement("secureAndPayBtn");
        // await this.clickElement(await secureAndPayBtn);
        // let paymentPassword = await this.findElement("paymentPassword");
        // await this.clickElement(await paymentPassword);
        // await this.sendKeys("123456");
        // let submitOTPBtn = await this.findElement("submitOTPBtn");
        // await this.clickElement(await submitOTPBtn);
    }
}

module.exports = PaymentPage;