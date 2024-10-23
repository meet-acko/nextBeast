const { remote } = require('webdriverio');
const { chromium } = require('playwright');
const { properties } = require('./config');
const path = require('path');

exports.getDriver = async function getDriver(){
    switch (properties.driverType) {
        case "playwright" : {
            switch (properties.configType) {
                case "web" : {
                    switch (properties.executionMode) {
                        case "headed" : {
                            return await chromium.launch({ headless: false });
                        }
                        case "headless" : {
                            return await chromium.launch({ headless: true, args: ['--window-size=1920,1080'] });
                        }
                    }
                }
                case "api" : {
                    return;
                }
            }
            break;
        }
        case "webdriverio" : {
            switch (properties.configType) {
                case "web" : {
                    switch (properties.browserName) {
                        case "chrome" : {
                            switch (properties.executionMode) {
                                case "headed" : {
                                    return await remote({
                                        capabilities: {
                                            browserName: 'chrome',
                                            'goog:chromeOptions': {
                                                args: ['--window-size=1920,1080']
                                            }
                                        }
                                        
                                    });
                                }
                                case "headless" : {
                                    return await remote({
                                        capabilities: {
                                            browserName: 'chrome',
                                            'goog:chromeOptions': {
                                                args: ['--headless', '--window-size=1920,1080']
                                            }
                                        }
                                    });
                                }
                            }
                        }
                        case "firefox" : {
                            switch (properties.executionMode) {
                                case "headed" : {
                                    return await remote({
                                        capabilities: {
                                            browserName: 'firefox'
                                        }
                                        
                                    });
                                }
                                case "headless" : {
                                    return await remote({
                                        capabilities: {
                                            browserName: 'firefox',
                                            "moz:firefoxOptions": {
                                                args: ['--headless', '--window-size=1920,1080']
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
                case "android" : {
                    if(properties.isDebugModeEnabled)
                        return await remote({
                            logLevel: "info",
                            path: properties.appiumDriverPath,
                            port: parseInt(properties.appiumPort),
                            capabilities: {
                                'appium:autoGrantPermissions' : true,
                                'appium:platformName' : properties.androidPlatform,
                                'appium:udid' : properties.androidDeviceName,
                                'appium:appPackage' : properties.appPackageName,
                                'appium:noReset' : properties.noReset,
                                'appium:enforceXPath1' : properties.enforceXPath1,
                                'appium:automationName' : properties.appiumAutomationName,
                                'appium:chromedriverExecutableDir' : path.resolve(__dirname,"..") + properties.chromeDriverExecutablePath,
                                'appium:chromedriverChromeMappingFile' : path.resolve(__dirname,"..") + properties.chromeDriverMappingFilePath
                            }
                        });
                        
                    else
                        return await remote({
                            logLevel: "info",
                            path: properties.appiumDriverPath,
                            port: parseInt(properties.appiumPort),
                            capabilities: {
                                'appium:autoGrantPermissions' : true,
                                'appium:platformName' : properties.androidPlatform,
                                'appium:udid' : properties.androidDeviceName,
                                'appium:app' : path.resolve(__dirname,"..") + properties.androidBuildPath,
                                'appium:automationName' : properties.appiumAutomationName,
                                'appium:chromedriverExecutableDir' : path.resolve(__dirname,"..") + properties.chromeDriverExecutablePath,
                                'appium:chromedriverChromeMappingFile' : path.resolve(__dirname,"..") + properties.chromeDriverMappingFilePath
                            }
                        });
                }
                case "api" : {
                    return;
                }
            }
            break;
        }
    }
}
    
exports.closeDriver = async function closeDriver(driver){
    switch (properties.driverType) {
        case "playwright" : {
            switch (properties.configType) {
                case "web" : {
                    await driver.close();
                    break;
                }
            }
            break;
        }
        case "webdriverio" : {
            switch (properties.configType) {
                case "web" : {
                    await driver.deleteSession();
                    //await driver.close();
                    break;
                }
                case "android" : {
                    await driver.deleteSession();
                    //await driver.close();
                    break;
                }
            }
            break;
        }
    }
}