const { properties } = require("../utils/config");
const { Helper } = require("../utils/helper");

class PaymentPage extends Helper{
    constructor(){
        super(__filename);
    }

    async completePaymentForWebInWebdriverIO(paymentGateWay = "v2"){
        if(properties.isMockPaymentEnabled){
            let url = await this.getUrl();
            let id = await (url.split("?id="))[1];
            await console.log(id);
            await this.setUrl("https://platform-simulator-frontend-uat.internal.ackodev.com/payments?id=" + id);
            await this.sleep(3);
            await this.clickElement(await this.findElement("successMockCTAForWeb", "", 30));
            await this.sleep(3);
        }else{
            if(paymentGateWay == "v2"){
                let iframe = await this.findElement("iframe",null,40);
                await this.switchToFrame(iframe);
                await this.sleep(2);
                await this.findDisplayedElement("scanAndPay");
                await this.sleep(1);
                let netBanking = await this.findElement("netBanking","",20);
                await this.clickElement(await netBanking);
                let selectBank = await this.findElement("selectBank", "Axis");
                await this.clickElement(await selectBank);
                await this.sleep(3);
                await driver.switchToParentFrame();
                let netBankingUsername = await this.findElement("netBankingUsernameForWeb", "", 30);
                await this.setElement(await netBankingUsername, "payu");
                let paymentPassword = await this.findElement("paymentPasswordForWeb");
                await this.setElement(await paymentPassword, "payu");
                let submitCTA = await this.findElement("submitCTAForWeb");
                await this.clickElement(await submitCTA);
                let successSimulateCTA = await this.findElement("successSimulateCTAForWeb");
                await this.clickElement(await successSimulateCTA);
                await this.sleep(2);
            }else if(paymentGateWay == "v1"){
                let iframe = await this.findElement("iframe",null,40);
                await this.switchToFrame(await iframe);
                await this.sleep(2);
                await this.findElement("scanAndPay");
                await this.sleep(1);
                let netBanking = await this.findElement("netBanking","",20);
                await this.clickElement(await netBanking);
                let selectBank = await this.findElement("selectBank", "Axis");
                await this.clickElement(await selectBank);
                await this.sleep(5);
                await driver.switchToParentFrame();
                let successButton = await this.findElement("successButton");
                await this.clickElement(await successButton);
                await this.sleep(2);
            }else{
                throw new Error("No such payment gateway found : " + paymentGateWay);
            }
        }
    }


    async completePayment(paymentGateWay = "v2"){
        switch(properties.configType){
            case "web":
                switch(properties.driverType){
                    case "webdriverio":
                        return this.completePaymentForWebInWebdriverIO(paymentGateWay);
                    case "playwright":
                        // return this.completePaymentForWebInPlayeright();
                }
            case "android":
                return this.completePaymentForApp(mobileNumber);
        }
    }


    async completePaymentForApp(paymentMethod="yearly", timeOut=100){
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