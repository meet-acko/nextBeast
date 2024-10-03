const { Helper } = require("../utils/helper");

class TravelPDPPage extends Helper{
    constructor(){
        super(__filename);
    }

    async raiseAClaim(data){
        // await this.clickElement(await this.findElement("contentContains", "International Travel Insurance"));
        await this.findElement("contentContains", "Acko travel insurance");
        await this.swipe(50, 85, 50, 15);
        await this.clickElement(await this.findElement("contentContains", "Had to cancel my trip"));
        await this.clickElement(await this.findElement("contentContains", "I was diagnosed with covid-19"));
        await this.clickElement(await this.findElement("contentContains", "Continue"));
        await this.sleep(0.5);
        await this.clickElement(await this.findElement("contentContains", "Continue"));
        await this.clickElement(await this.findElement("hintContains", "Date of incident"));
        await this.clickElement(await this.findElement("contentContains", "OK"));
        // await this.clickElement(await this.findElement("hintContains", "Alternate mobile number"));
        // await this.sendKeys("8980301203");
        await this.clickElement(await this.findElement("contentContains", "Continue"));
        await this.clickElement(await this.findElement("contentContains", "Travel ticket"));
        await this.clickElement(await this.findElement("firstSceenshotFile"));
        await this.sleep(2);
        await this.clickElement(await this.findElement("contentContains", "Test report"));
        await this.clickElement(await this.findElement("firstSceenshotFile"));
        await this.sleep(2);
        await this.clickElement(await this.findElement("contentContains", "Continue"));
        await this.findElement("contentContains", data.fullName);
        await this.clickElement(await this.findElement("contentContains", "Continue"));
        await this.clickElement(await this.findElement("addPayOutAccount", "2"));
        await this.setElement(await this.findElement("hintContains", "Account holder"), data.fullName);
        await this.setElement(await this.findElement("hintContains", "IFSC"), "YESB0000262");
        await this.setElement(await this.findElement("hintContains", "Account number"), "026291800001191");
        await this.setElement(await this.findElement("hintContains", "Confirm account number"), "026291800001191");
        // await this.setElement(await this.findElement("hintContains", "UPI ID"), "success@upi");
        await this.clickElement(await this.findElement("textContains", "Verify now"));
        await this.clickElement(await this.findElement("textContains", "Submit account details"));
        await this.clickElement(await this.findElement("textContains", "Continue"));
        await this.clickElement(await this.findElement("textContains", "026291800001191"));
        await this.clickElement(await this.findElement("textContains", "Continue"));
        await this.clickElement(await this.findElement("textContains", "Verify now"));
        await this.clickElement(await this.findElement("textContains", "Submit account details"));
        await this.clickElement(await this.findElement("textContains", "Continue"));
        await this.clickElement(await this.findElement("contentContains", "I declare that"));
        await this.clickElement(await this.findElement("contentContains", "Submit claim"));
        await this.clickElement(await this.findElement("contentContains", "Track claim"));
        await this.clickElement(await this.findElement("contentContains", "View timeline"));
    }
}

module.exports = TravelPDPPage;