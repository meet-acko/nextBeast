const { properties } = require("../utils/config");
const { Helper } = require("../utils/helper");

class HomePage extends Helper{
    constructor(){
        super(__filename);
    }

    async webLogin(mobileNumber){
        await this.clickElement(await this.findElement("loginCTA"));
        let mobileNumberInput = await this.findElement("mobileNumberInput");
        await this.clickElement(await mobileNumberInput);
        await this.setElement(await mobileNumberInput, mobileNumber);
        await this.clickElement(await this.findElement("getOTPCTA"));
        await this.findElement("otpSentText", mobileNumber);
        await this.sleep(1);
        for(let i=40; i>0; i--){
            let result = await this.executeSQLQuery(`SELECT template_context_data->>'otp' AS otp FROM sms_report WHERE template_name = 'send_otp_default' AND recipient='${mobileNumber}' AND created_on > NOW()- INTERVAL '150 second' ORDER BY id DESC LIMIT 1`);
            if(result.length > 0){
                if("otp" in result[0]){
                    let otp = result[0].otp;
                    let input1 = await this.findElement("otpInput", "1");
                    await this.setElement(await input1, otp[0]);
                    let input2 = await this.findElement("otpInput", "2");
                    await this.setElement(await input2, otp[1]);
                    let input3 = await this.findElement("otpInput", "3");
                    await this.setElement(await input3, otp[2]);
                    let input4 = await this.findElement("otpInput", "4");
                    await this.setElement(await input4, otp[3]);
                    await this.sleep(1);
                    return;
                }
                break;
            }else{
                await this.sleep(1);
            }
        }
        throw await new Error('OTP not found');
    }

    async webLoginPlaywright(mobileNumber){
        await page.locator("//*[text()='Login']").first().click();
        await page.waitForSelector("//*[@type='number']");
        await this.sleep(2);
        await page.locator("//*[@type='number']").first().click();
        await page.locator("//*[@type='number']").first().fill(mobileNumber);
        await page.locator("//*[text()='Log in']").first().click();
        await page.waitForSelector("//*[contains(text(),'sent to " + mobileNumber + "')]");
        await this.sleep(1);
        for(let i=40; i>0; i--){
            let result = await this.executeSQLQuery(`SELECT template_context_data->>'otp' AS otp FROM sms_report WHERE template_name = 'send_otp_default' AND recipient='${mobileNumber}' AND created_on > NOW()- INTERVAL '150 second' ORDER BY id DESC LIMIT 1`);
            if(result.length > 0){
                if("otp" in result[0]){
                    let otp = await result[0].otp;
                    await page.locator("(//input)[1]").first().fill(otp[0]);
                    await page.locator("(//input)[2]").first().fill(otp[1]);
                    await page.locator("(//input)[3]").first().fill(otp[2]);
                    await page.locator("(//input)[4]").first().fill(otp[3]);
                    await this.sleep(1);
                    return;
                }
                break;
            }else{
                await this.sleep(1);
            }
        }
        throw await new Error('OTP not found');
    }

    async mWebLogin(mobileNumber){
        let hamburger = await this.findElement("hamburger");
        await this.clickElement(await hamburger);
        let loginCTA = await this.findElement("loginCTA");
        await this.clickElement(await loginCTA);
        let mobileNumberInput = await this.findElement("mobileNumberInput");
        await this.clickElement(await mobileNumberInput);
        await mobileNumberInput.setValue(mobileNumber);
        let getOTPCTA = await this.findElement("getOTPCTA");
        await getOTPCTA.click();
        await this.sleep(1);
        let result = await this.executeSQLQuery(`SELECT template_context_data->>'otp' AS otp FROM sms_report WHERE template_name = 'send_otp_default' AND recipient='${mobileNumber}' AND created_on > NOW()- INTERVAL '600 second' ORDER BY id DESC LIMIT 1`);
        if("otp" in result[0]){
            let otp = result[0].otp;
            let input1 = await this.findElement("otpInput", "1");
            await input1.setValue(otp[0]);
            let input2 = await this.findElement("otpInput", "2");
            await input2.setValue(otp[1]);
            let input3 = await this.findElement("otpInput", "3");
            await input3.setValue(otp[2]);
            let input4 = await this.findElement("otpInput", "4");
            await input4.setValue(otp[3]);
        }
        await this.sleep(1);
    }

    async appLogin(mobileNumber){
        let skipButton = await this.findElement("skipButton", "", 50);
        await this.sleep(1);
        await this.clickElement(skipButton);
        let LoginWithPhoneCTA = await this.findElement("LoginWithPhoneCTA");
        await this.clickElement(LoginWithPhoneCTA);
        await this.sleep(0.5);
        await this.tapOnCoordinate();
        let mobileInput = await this.findElement("mobileInput");
        await this.setElement(mobileInput, mobileNumber);
        let verifyButton = await this.findElement("verifyButton");
        await this.clickElement(verifyButton);
        await this.findElement("waitForOtp", mobileNumber, 150);
        let otpInput = await this.findElement("otpFillInput");
        for(let i=40; i>0; i--){
            let result = await this.executeSQLQuery(`SELECT template_context_data->>'otp' AS otp FROM sms_report WHERE template_name = 'send_otp_default' AND recipient='${mobileNumber}' AND created_on > NOW()- INTERVAL '150 second' ORDER BY id DESC LIMIT 1`);
            if(result.length > 0){
                if("otp" in result[0]){
                    let otp = result[0].otp;
                    await this.setElement(otpInput, otp);
                    await this.sleep(1);
                    return;
                }
                break;
            }else{
                await this.sleep(1);
            }
        }
        throw await new Error('OTP not found');
    } 

    async goToMyAccountsPage(){
        let myPolicyTab = await this.findElement("myPolicyTab");
        await this.clickElement(myPolicyTab);
    }

    async verifyNoPolicyText(){
        await this.findElement("noPolicyFoundText", null, 30);
    }

    async login(mobileNumber){
        switch(properties.configType){
            case "web":
                switch(properties.driverType){
                    case "webdriverio":
                        return this.webLogin(mobileNumber);
                    case "playwright":
                        return this.webLoginPlaywright(mobileNumber);
                }
            case "android":
                return this.appLogin(mobileNumber);
            case "mweb":
                return this.mWebLogin(mobileNumber);
        }
    }

    async addKYCSuccess(name , mobileNumber){
        await this.executeSQLQuery(`UPDATE kyc_details SET name='${name}',phone='${mobileNumber}' WHERE id='91007757-9c00-4300-8b32-9ba0d088825f'`, properties.centralKYCDBHost, properties.centralKYCDBUsername, properties.centralKYCDBPassword, properties.centralKYCDBName);
    }
}

module.exports = HomePage;