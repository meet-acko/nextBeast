const { properties } = require('../utils/config');
const { getDriver, closeDriver } = require('../utils/driverSetUp');
const { Helper } = require('../utils/helper');

before(async function() {
});

beforeEach(async function() {
    switch (properties.configType) {
        case "web" : {
            switch (properties.driverType) {
                case "playwright" : {
                    global.driver = await getDriver();
                    global.page = await global.driver.newPage();
                    await global.page.setDefaultTimeout(3*60*60*1000);
                    if(await properties.loadDefaultURLInitially == true)
                        await global.page.goto(properties.defaultURL);
                    break;
                }
                case "webdriverio" : {
                    global.driver = await getDriver();
                    if(await properties.loadDefaultURLInitially == true)
                        await global.driver.url(properties.defaultURL);
                    break;
                }
            }
            break;
        }
        case "android" : {
            switch (properties.driverType) {
                case "webdriverio" : {
                    global.driver = await getDriver();
                    Helper.setCurrentContext("native");
                    break;
                }
            }
            break;
        }
    }
});

after(async function() {
});

afterEach(async function() {
    try{
        switch (properties.configType) {
            case "web" : {
                switch (properties.driverType) {
                    case "playwright" : {
                        await closeDriver(await global.driver);
                        await Helper.verifySoftAssert();
                        await allure.attachment(new Buffer.from(await page.screenshot({ fullPage: true }), "base64"), "image/png", "Screenshot");
                        break;
                    }
                    case "webdriverio" : {
                        await closeDriver(await global.driver);
                        await Helper.verifySoftAssert();
                        await allure.attachment(new Buffer.from(await page.screenshot({ fullPage: true }), "base64"), "image/png", "Screenshot");
                        break;
                    }
                }
                break;
            }
            case "android" : {
                switch (properties.driverType) {
                    case "webdriverio" : {
                        await closeDriver(await global.driver);
                        await Helper.verifySoftAssert();
                        await allure.attachment(new Buffer.from(await driver.takeScreenshot(), "base64"), "image/png", "Screenshot");
                        break;
                    }
                }
                break;
            }
        }
    }catch(error){
        console.log(error)
    }
});