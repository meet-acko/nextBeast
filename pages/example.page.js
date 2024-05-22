const { Helper } = require("../utils/helper");
const SoftAssert = require("../utils/softAssert");

let softAssert = new SoftAssert();
class ExamplePage extends Helper{
    constructor(){
        super(__filename);
    }

    async visualTestForLandingPagesInPlaywright(columnName, page){
        let landingPagesData = await this.readCSVFile( __dirname + "/../data/demoUrls.csv");
        for(let i=0; i<landingPagesData.length; i++){
            await page.goto(await landingPagesData[i][columnName]);
            await this.takeVisualSnapshotInPlaywright(await page);
        }
        await softAssert.verify();
    }

    async takeVisualSnapshotInPlaywright(page){
        await page.evaluate(() => {
            const totalHeight = document.body.scrollHeight;
            let currentScroll = window.scrollY || window.pageYOffset;
            const scrollStep = 50;
            const scrollDelay = 25;
        
            function scrollDown() {
                if (currentScroll < totalHeight - window.innerHeight) {
                    currentScroll += scrollStep;
                    window.scrollTo(0, currentScroll);
                    setTimeout(scrollDown, scrollDelay);
                } else {
                    window.scrollTo(0, totalHeight);
                    setTimeout(()=>{}, 50);
                    window.scrollTo(0, 0);
                }
            }
            scrollDown();
        })
        let bodyHeight = await page.evaluate(()=>{return document.body.scrollHeight});
        await this.sleep((await bodyHeight)/2000);
        await softAssert.assertImageInPlaywright(await page);
    }

    async visualTestForLandingPagesUsingPlaywright(columnName){
        let landingPagesData = await this.readCSVFile( __dirname + "/../data/demoUrls.csv");
        for(let i=0; i < await landingPagesData.length; i++){
            await page.goto(await landingPagesData[i][columnName]);
            await this.takeVisualSnapshot();
        };
        await Helper.verifySoftAssert();
    }

    async visualTestForLandingPagesUsingWebdriverIO(columnName){
        let landingPagesData = await this.readCSVFile( __dirname + "/../data/demoUrls.csv");
        for(let i=0; i < await landingPagesData.length; i++){
            await driver.url(await landingPagesData[i][columnName]);
            await this.sleep(2);
            await this.takeVisualSnapshot();
        }
        await Helper.verifySoftAssert();
    }
}

module.exports = ExamplePage;