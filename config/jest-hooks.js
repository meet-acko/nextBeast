const { toMatchImageSnapshot } = require('jest-image-snapshot');
const { properties } = require('../utils/config');
const { getDriver, closeDriver } = require('../utils/driverSetUp');
const { Helper } = require('../utils/helper');

expect.extend({ 
    toMatchImageSnapshot(received, options) {
        const customConfig = {
            customSnapshotsDir: `${__dirname}/../results/snapshots`,
            customDiffDir: `${__dirname}/../results/differences`,
                ...options,
            };
        return toMatchImageSnapshot.call(this, received, customConfig);
    } 
});

beforeAll(async function() {
});

beforeEach(async () => {
    switch (properties.configType) {
        case "web" : {
            switch (properties.driverType) {
                case "playwright" : {
                    global.driver = await getDriver();
                    global.page = await global.driver.newPage();
                    await global.page.setDefaultTimeout(3*60*60*1000);
                    await global.page.goto(properties.defaultURL);
                    break;
                }
                case "webdriverio" : {
                    global.driver = await getDriver();
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
                    break;
                }
            }
            break;
        }
    }
});

afterAll(async () => {
    
});

afterEach(async () => {
    try{
        switch (properties.configType) {
            case "web" : {
                switch (properties.driverType) {
                    case "playwright" : {
                        await allure.attachment(new Buffer.from(await page.screenshot({ fullPage: true }), "base64"), "image/png", "Screenshot");
                        break;
                    }
                    case "webdriverio" : {
                        await allure.attachment(new Buffer.from(await driver.takeScreenshot(), "base64"), "image/png", "Screenshot");
                        break;
                    }
                }
                break;
            }
            case "android" : {
                switch (properties.driverType) {
                    case "webdriverio" : {
                        await allure.attachment(new Buffer.from(await driver.takeScreenshot(), "base64"), "image/png", "Screenshot");
                        break;
                    }
                }
                break;
            }
        }
        await closeDriver(await global.driver);
        await Helper.verifySoftAssert();
    }catch(error){
        console.log(error)
    }
});
