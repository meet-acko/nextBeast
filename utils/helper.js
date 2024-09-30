const request = require("./requestHandler");
const fs = require("fs");
const path = require('path');
const { Pool } = require("pg");
const { properties } = require("./config");
const { parse } = require('csv-parse');
const stringify = require('csv-stringify');
const SoftAssert = require("./softAssert");
const cheerio = require('cheerio');

let softAssert = new SoftAssert();

exports.Helper = class Helper{
    constructor(file){
        if(file){
            if(file.includes("\\pages\\")){
                this.file = file.replace("\\pages\\", "\\locators\\").replace(".js", ".json");
            }else{
                this.file = file.replace("/pages/", "/locators/").replace(".js", ".json");
            }
        }
        console.log(this.file);
        this.request = request;
    }

    static async verifySoftAssert(){
        await softAssert.verify();
    }

    static setCurrentContext(context){
        this.currentContext = context;
    }
    
    static getCurrentContext(){
        return this.currentContext;
    }

    async getSelectorsType(key){
        return await key.toLowerCase().includes("xpath") ? "xpath" : key.toLowerCase(); 
    }

    async sleep(second) {
        return new Promise((resolve) => setTimeout(resolve, parseInt(second*1000)));
    }

    async executeSQLQuery(sqlQuery, host=properties.masterDBHost, username=properties.masterDBUsername, password=properties.masterDBPassword, databaseName=properties.masterDBName, port=properties.masterDBPort){
        let pool = await new Pool({
            host: host,
            user: username,
            password: password,
            database: databaseName,
            port: port,
            statement_timeout: 30000
        });
        return new Promise(function (resolve, reject) {
            pool.connect((err, client, done) => {
                if (err) throw err;
                console.log(`SQL Query : ${sqlQuery}`);
                client.query(sqlQuery, (err, res) => {
                    done();
                    if (err) {
                      console.log("Error executing query :" + sqlQuery);
                      reject(0);
                    } else {
                        resolve(res.rows);
                    }
                });
            });
        });
    }

    async replaceElement(element, replaceWith) {
        if (await replaceWith) {
            let result = await element.replace("$", String(replaceWith));
            return result;
        }
        return element;
    }

    async sendKeys(value){
        switch(properties.configType){
            case "web":
                return await driver.keys("" + value);
            case "mweb":
                return await driver.keys("" + value);
            case "android":
                {
                    switch(Helper.getCurrentContext()){
                        case "webview":
                            return await driver.keys("" + value);
                        case "native":
                            return await this.sendKeysForWebView("" + value);
                    }
                }
        }
    }

    async sendKeysForWebView(value){
        let currentContext = Helper.getCurrentContext();
        await this.switchContext("webview");
        if (typeof value !== 'string') {
            value = ""+value;
        }
        let keyAct = await driver.action('key');
        for(let i in [...value]){
            console.log(await value[i]);
            await keyAct.down(await value[i]);
            await keyAct.up(await value[i]);
            await keyAct.pause(500)
        }
        await keyAct.perform();
        await this.switchContext(currentContext);
    }

    async findWebElement(elementName, replaceWith, timeOut = 9.5, elementStatus = "clickable", returnListElements = false, refreshCount = 0){
        let resultElement;
        return await new Promise(async (resolve, reject) => {
            try{
                await fs.readFile(this.file, "utf8", async (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    let obj = await JSON.parse(data);
                    let webElement;
                    if (await obj[elementName]) {
                        if("context" in obj[elementName]) {
                            await this.switchContext(obj[elementName].context);
                            await delete obj[elementName].context;
                        }
                        let startTime = await (new Date()).getTime();
                        let endTime = await startTime + parseInt(timeOut * 1000);
                        let refreshInterval = await parseInt((timeOut* 1000)/(refreshCount+1));
                        let refreshTime = await startTime + await refreshInterval;
                        while( await ((new Date()).getTime() < endTime)){
                            let locators = await obj[elementName];
                            for (let locator in locators) {
                                if (await returnListElements) { // not working
                                    webElement = await driver.$$(await this.replaceElement(locators[locator], replaceWith));
                                    await this.sleep(0.1);                                    
                                } else {
                                    webElement = await driver.$(await this.replaceElement(locators[locator], replaceWith));
                                    await this.sleep(0.1);
                                    let webEleExist = await webElement.isExisting();
                                    if( await webEleExist && await (elementStatus == "clickable")){
                                        if (await webElement.isClickable()) {
                                            resultElement = await webElement;
                                            break;
                                        }
                                    }else if(await webEleExist && await (elementStatus == "displayed")){
                                        if (await webElement.isDisplayed()) {
                                            resultElement = await webElement;
                                            break;
                                        }
                                    }else if(await webEleExist){
                                        resultElement = await webElement;
                                        break;
                                    }
                                }
                            }
                            if (await resultElement) {
                                break;
                            }
                            await this.sleep(0.5);
                            if(await ((new Date()).getTime() > refreshTime) && await refreshCount >0){
                                await driver.refresh();
                                await --refreshCount;
                                refreshTime += await refreshInterval;
                            }
                        }
                        if (await resultElement) {
                            await resolve(await resultElement);
                        }else{
                            let errorMsg="";
                            errorMsg+="\nurl - "+ await driver.getUrl();
                            for (let locator in obj[elementName]) {
                                errorMsg = await errorMsg + "\n" + locator+" - " + await this.replaceElement(obj[elementName][locator],replaceWith);
                            }
                            await reject(new Error(elementName + " not found" + errorMsg));
                        }
                    }else{
                        await reject(new Error(elementName + " is not available in json file"));
                    }
                });
            }catch(e){
                await reject(e);
            }
        });
    }

    async clickElement(element){
        switch(properties.configType){
            case "web":
                return await element.click();
            case "mweb":
                return await element.click();
            case "android":
                switch (Helper.getCurrentContext()) {
                    case "webview":
                        return await element.click();
                    case "native":
                        return await driver.elementClick(element);
                }
        }
    }

    async readCSVFile(csvFilePath){
        try {
            let records = [];
            let parser = await fs.createReadStream(csvFilePath).pipe(parse({
                    columns: true, // Parse columns as properties of an object
                    trim: true, // Trim leading and trailing spaces in columns
                    skip_empty_lines: true
                }));
            for await (let record of await parser) {
                await records.push(record);
            }
            return await records;
        }catch(error){
            await console.error('Error during CSV parsing:', error);
        }
    }

    async writeCSVFile(csvFilePath, data){
        // sample data = [
        // { name: 'John Doe', age: 30, city: 'New York' },
        // { name: 'Jane Smith', age: 25, city: 'Los Angeles' }
        // ];
        const output = await fs.createWriteStream(csvFilePath);
        const stringifier = await stringify({
            header: true, // Include column headers as the first line
            // columns: { name: 'NAME', age: 'AGE', city: 'CITY' }, // Map object keys to column headers
        });
        await stringifier.pipe(output);
        await data.forEach(item => {
            stringifier.write(item);
        });
        await stringifier.end();
        await output.on('finish', () => {
            console.log('CSV file has been written successfully.');
        });
    }

    async setUrl(url){
        switch(properties.configType){
            case "web":{
                await driver.url(url)
                return;
            }
            case "mweb":{
                await driver.url(url)
                return;
            }
            case "android":{
                await driver.navigateTo(url);
                return;
            }
            default:
                await driver.navigateTo(url);
                return;
        }
    }

    async executeJSScript(jsScript){
        if(properties.driverType == "webdriverio")
            await driver.executeScript(jsScript, []);
        else if(properties.driverType == "playwright")
            await page.evaluate(jsScript);
    }

    async executeJavaScript(jsScript){
        return await driver.executeScript(jsScript,[]);
    }

    async getText(locator){
        const jsScript = `
            var xpath = "${locator}";
            var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element ? element.innerText : null;
        `;
        const text = await this.executeJavaScript(jsScript);
        return text
    }

    async compareAndPerformYear(locator,yearOfDOB){
        while(true){
            const dobYearRangeText = await this.getText(locator)
            const [startYear, endYear] = dobYearRangeText.split('-').map(Number);
            if(yearOfDOB >= startYear && yearOfDOB <= endYear){
                await this.clickElement(await this.findElement('exact',yearOfDOB))
                break
            }else{
                await this.clickElement(await this.findElement('leftDOB',1))
            }
        } 
    }

    async takeFullPageScreenshot(){
        await driver.executeScript(`function smoothScrollToBottom() {
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
        }
        smoothScrollToBottom();`,[])
        
        let bodyHeight = await driver.executeScript("return document.body.scrollHeight",[]);
        await this.sleep((await bodyHeight)/2000);
        // let bodywidth = await driver.executeScript("return document.body.scrollWidth",[]);
        await driver.setWindowSize(1920, bodyHeight);
        // await driver.refresh();
        await this.sleep(2);
        return await driver.takeScreenshot();
    }

    async takeFullPagePlaywrightScreenshot(){
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
        await this.sleep(2);
        await page.waitForLoadState('networkidle');
        return await page.screenshot({ fullPage: true });
    }

    async takeVisualSnapshot(){
        if(properties.isVisualTestingEnabled){
            let image;
            if(properties.driverType == "webdriverio")
                image = await this.takeFullPageScreenshot();
            else if(properties.driverType == "playwright")
                image = await this.takeFullPagePlaywrightScreenshot();
            await softAssert.assertImage(await image);
        }
    }

    async takeHTMLSnapshot(){
        if(properties.isVisualTestingEnabled){
            let $;
            if(properties.driverType == "webdriverio"){
                $ = await cheerio.load(await driver.getPageSource());
            }else{
                await page.waitForLoadState('networkidle');
                $ = await cheerio.load(await page.content());
            }
            // removing all unwanted html code
            await $('script').remove(); 
            await $('[src]').removeAttr('src');
            await $('style').remove();
            await $('noscript').remove();
            await $('[class]').removeAttr('class');
            await $('[id]').removeAttr('id');
            await $('div').each(async function () {
                const attributes = Object.keys(this.attribs);
                // Check if any attribute starts with 'data-gtm-'
                const hasDataGtmAttribute = attributes.some(attr => attr.startsWith('data-gtm-'));
                if (hasDataGtmAttribute) {
                const element = await $(this);
                    // Iterate over each attribute in the element
                    Object.keys(element.attr()).forEach(attr => {
                        // Check if the attribute starts with 'data-gtm-'
                        if (attr.startsWith('data-gtm-')) {
                            element.removeAttr(attr);
                        }
                    });
                }
            });

            await $('a').each(async function () {
                const attributes = Object.keys(this.attribs);
                const hasDataGtmAttribute = attributes.some(attr => attr.startsWith('href'));
                if (hasDataGtmAttribute) {
                const element = await $(this);
                    // Iterate over each attribute in the element
                    Object.keys(element.attr()).forEach(attr => {
                        if (attr.startsWith('href')) {
                            element.removeAttr(attr);
                        }
                    });
                }
            });

            await $('img').each(async function () {
                const attributes = Object.keys(this.attribs);
                const hasDataGtmAttribute = attributes.some(attr => attr.startsWith('srcset'));
                if (hasDataGtmAttribute) {
                const element = await $(this);
                    // Iterate over each attribute in the element
                    Object.keys(element.attr()).forEach(attr => {
                        if (attr.startsWith('srcset')) {
                            element.removeAttr(attr);
                        }
                    });
                }
            });

            await $('link').each(async function () {
                const attributes = Object.keys(this.attribs);
                const hasDataGtmAttribute = attributes.some(attr => attr.startsWith('href'));
                
                if (hasDataGtmAttribute) {
                const element = await $(this);
                    // Iterate over each attribute in the element
                    Object.keys(element.attr()).forEach(attr => {
                        if (attr.startsWith('href')) {
                            element.removeAttr(attr);
                        }
                    });
                }
                const hasImageSecretAttribute = attributes.some(attr => attr.startsWith('imagesrcset'));
                if (hasImageSecretAttribute) {
                    const element = await $(this);
                    // Iterate over each attribute in the element
                    Object.keys(element.attr()).forEach(attr => {
                        if (attr.startsWith('imagesrcset')) {
                            element.removeAttr(attr);
                        }
                    });
                }
            });

            $('p').each((index, element) => {
                const $element = $(element);
                if (!$element.html().trim()) {
                    $element.remove();
                }
            });
            
            await softAssert.assertHTML(
            (await $.html()).replace(/\n/g, '').replace(/\s+/g, ' ').replace(/>/g, '>\n').replace(/ </g, '<')
            );
        }
    }

    async scrollToBottomOfWebPage(){
        await driver.executeScript("return window.scrollTo(0, document.body.scrollHeight)",[]);
    }

    randomMobileNumber() {
        var result = Math.floor(Math.random() * 999999);
        var index = Math.floor(Math.random() * 19 + 1);
        let arr = [6010, 6011, 6012, 6013, 6014, 6015, 6016, 6017, 6018, 6019, 6020, 6021, 6022, 6023, 6024, 6025, 6026, 6027, 6028, 6029];
        return "" + (arr[index] * 1000000 + result);
    }

    randomNumber(low, high){
        return Math.floor((Math.random() * (high - low)) + low);
    }

    generateRandomPincode() {
        const pincodeLength = 6;
        const randomNumber = Math.floor(Math.random() * (10 ** pincodeLength));
        const pincode = randomNumber.toString().padStart(pincodeLength, '0');
        return pincode;
    }

    getMonthName(monthIndex) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[monthIndex];
    }

    getEndMonthName(setMonthCount) {
        let travelStartMonthName = this.getNextMonthName();
        let currentYear = new Date().getFullYear(); 
        let currentMonthIndex = new Date(Date.parse(travelStartMonthName + " 1, " + currentYear)).getMonth();
        let setMonth = setMonthCount;  
        let travelEndMonthIndex = (currentMonthIndex + setMonth) % 12;
        let travelEndMonthName = this.getMonthName(travelEndMonthIndex);
        return travelEndMonthName
    }
    
    getNextMonthName() {
        const currentDate = new Date();
        const nextMonthIndex = (currentDate.getMonth() + 2) % 12;
        const nextMonthDate = new Date(currentDate.getFullYear(), nextMonthIndex);
        const options = { month: 'long' };
        const nextMonthName = nextMonthDate.toLocaleString('default', options);
        return nextMonthName
    }

    getRandomGender() {
        const genders = ['Male','Female'];
        const randomIndex = Math.floor(Math.random() * genders.length);
        return genders[randomIndex];
    }

    randomName(length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    registrationNumber() {
        var city = "";
        var citycode = "";
        var statenum = "";
        var state = "";
        let statecode = ["AP", "AR", "BR", "CG", "CH", "AN", "DL", "DN", "DD", "GA", "GJ", "HP", "HR", "JH", "JK", "KA", "KL", "MH", "ML", "MN", "MP", "MZ", "NL", "OD", "OR", "PB", "PY", "RJ", "SK", "TN", "TS", "TR", "UP", "UK", "WB"];
        var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var num = "1234567890";
        var numLength = num.length;
        var charLength = char.length;
        for (let i = 0; i < 2; i++) {
            city += char.charAt(Math.floor(Math.random() * charLength));
        }
        for (let i = 0; i < 4; i++) {
            citycode += num.charAt(Math.floor(Math.random() * numLength));
        }
        state = Math.floor(Math.random() * statecode.length);
        for (let i = 0; i < 2; i++) {
            statenum += num.charAt(Math.floor(Math.random() * numLength));
        }
        return statecode[state] + statenum + city + citycode;
    }

    async travellerTypeCount(data) {
        let travellerTypes = [];
        for (let key in data) {
            // Check if the key starts with 'travellerType'
            if (key.startsWith('travellerType')) {
                // Add the value to the travellerTypes array
                travellerTypes.push(data[key]);
            }
        }
        return travellerTypes
    }

    async formatDOB(day, month, year) {
        day = day.toString().padStart(2, '0');
        month = month.toString().padStart(2, '0');
        return `${day}-${month}-${year}`;
    }

    async handleClick(element, index, sleepDuration = 0.5) {
        if (element) {
            await this.clickElement(await this.findElement(element, index));
            await this.sleep(sleepDuration);
        }
    }

    async findRefreshAppElement(elementName, replaceWith, timeOut=60, elementStatus, refreshCount=2){
        return await this.findAppElement(elementName, replaceWith, timeOut, elementStatus, refreshCount);
    }

    async findDisplayedElement(elementName, replaceWith, timeOut, elementStatus = "displayed", returnListElements){
        switch(properties.configType){
            case "web":{
                let timerValue = timeOut ? timeOut : 15;
                return await this.findWebElement(elementName, replaceWith, timerValue, elementStatus, returnListElements);
            }
            case "mweb":{
                let timerValue = timeOut ? timeOut : 15;
                return await this.findWebElement(elementName, replaceWith, timerValue, elementStatus, returnListElements);
            }
            case "android":{
                let timerValue = timeOut ? timeOut : 40;
                return await this.findAppElement(elementName, replaceWith, timerValue, elementStatus);
            }
        }
    }

    async findElement(elementName, replaceWith, timeOut, elementStatus){
        switch(properties.configType){
            case "web":{
                let timerValue = timeOut ? timeOut : 15;
                return await this.findWebElement(elementName, replaceWith, timerValue, elementStatus);
            }
            case "mweb":{
                let timerValue = timeOut ? timeOut : 15;
                return await this.findWebElement(elementName, replaceWith, timerValue, elementStatus);
            }
            case "android":{
                let timerValue = timeOut ? timeOut : 40;
                return await this.findAppElement(elementName, replaceWith, timerValue, elementStatus);
            }
        }
    }

    async findAppElement(elementName, replaceWith, timeOut = 10, elementStatus= "clickable", refreshCount=0){
        let resultElement;
        return await new Promise(async (resolve, reject) => {
            try{
                await fs.readFile(this.file, "utf8", async (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    var obj = await JSON.parse(data);
                    if (await obj[elementName]) {
                        if("context" in obj[elementName])
                            await this.switchContext(obj[elementName].context);
                        let startTime = await (new Date()).getTime();
                        let endTime = await startTime + (timeOut*1000);
                        let refreshInterval = await parseInt((timeOut*1000)/(refreshCount+1));
                        let refreshTime = await startTime + await refreshInterval;
                        while( await ((new Date()).getTime() < endTime)){
                            switch (await Helper.getCurrentContext()) {
                                case "native":{
                                    let selectors = await JSON.parse(JSON.stringify(obj[elementName]));
                                    if("context" in selectors) delete selectors.context;
                                    let element;
                                    for (var key in selectors) {
                                        try{
                                            element = await driver.findElement(await this.getSelectorsType(key), await this.replaceElement(selectors[key], replaceWith));
                                            break;
                                        }catch(e){
                                            console.log(e);
                                        }
                                    }
                                    if(await element.ELEMENT){
                                        resultElement = await element.ELEMENT;
                                        break;
                                    }
                                    await this.sleep(0.5);
                                }
                                break;
                                default:{
                                    let selectors = await JSON.parse(JSON.stringify(obj[elementName]));
                                    if("context" in selectors) delete selectors.context;
                                    let element;
                                    for (var key in selectors) {
                                        try{
                                            element = await driver.$(await this.replaceElement(selectors[key], replaceWith));
                                            await this.sleep(0.1);
                                            let webEleExist = await element.isExisting();
                                            if( await webEleExist && await (elementStatus == "clickable")){
                                                if (await element.isClickable()) {
                                                    resultElement = await element;
                                                    break;
                                                }
                                            }else if(await webEleExist && await (elementStatus == "displayed")){
                                                if (await element.isDisplayed()) {
                                                    resultElement = await element;
                                                    break;
                                                }
                                            }else if(await webEleExist){
                                                resultElement = await element;
                                                break;
                                            }
                                        }catch(e){
                                            console.log(e);
                                        }
                                    }
                                    if(await resultElement){
                                        break;
                                    }
                                    await this.sleep(0.5);
                                    if(await ((new Date()).getTime() > refreshTime) && await refreshCount >0){
                                        await driver.refresh();
                                        await --refreshCount;
                                        refreshTime += await refreshInterval;
                                    }
                                }
                                break;
                            }
                            if(await resultElement) break;
                        }
                        if(await resultElement)
                            resolve(await resultElement);
                        else
                            reject(new Error(elementName + " is not found"));
                    }else{
                        await reject(new Error(elementName + " is not available in json file"));
                    }
                });
            }catch(e){
                console.log(e);
                await reject(new Error(e + "\nElement name is : " + elementName));
            }
        });
    }

    async swipe(initXPercentage, initYPercentage, endXPercentage, endYPercentage, duration=500){
        let previousContext = await Helper.getCurrentContext();
        await this.switchContext("native");
        const { width, height } = await driver.getWindowSize();
        await driver.actions([
            await driver.action('pointer')
            .move(parseInt((initXPercentage * width) / 100), parseInt((initYPercentage * height) / 100))
            .down()
            .pause(10)
            .move({ "duration" : duration, "x" : parseInt((endXPercentage * width) / 100), "y" : parseInt((endYPercentage * height) / 100) })
            .up()
        ]);
        await this.switchContext(previousContext);
    }

    async refreshFlutterPage(){
        let previousContext = await Helper.getCurrentContext();
        // await this.sleep(3);
        await this.switchContext("native");
        const { width, height } = await driver.getWindowSize();
        await driver.actions([
            await driver.action('pointer')
            .move(parseInt(width/3), parseInt((height * 2) / 10))
            .down()
            .move(parseInt(width/3), parseInt((height * 9) / 10))
            .up()
            // { action: 'press', options: { x: parseInt(width/3), y: parseInt((height * 2) / 10) }},
            // { action: 'moveTo', options: { x: parseInt(width/3), y: parseInt((height * 3) / 10) }},
            // { action: 'moveTo', options: { x: parseInt(width/3), y: parseInt((height * 9) / 10) }},
            // { action: 'release', options: { }}
        ]);
        await this.switchContext(previousContext);
    }

    async tapOnElement(element){
        let location;
        let previousContext = await Helper.getCurrentContext();
        switch (Helper.getCurrentContext()) {
            case "webview":
                // await console.log(await element.getLocation());
                await this.switchContext("native");
                location = await driver.getElementRect((await element).elementId);
                break;
            case "native":
                // pass id in this method
                await this.switchContext("native");
                location = await driver.getElementRect(element);
                break;
            default:
                break;
        }
        await console.log(await location);
        await this.tapOnCoordinate(parseInt(await location.x) + parseInt(parseInt(await location.width)/10), parseInt(await location.y) + parseInt(parseInt(await location.height)/10));
        await this.switchContext(previousContext);
    }

    async tapOnCoordinate(xCoOrdinate, yCoOrdinate){
        let previousContext = await Helper.getCurrentContext();
        await this.switchContext("native");
        if(xCoOrdinate || yCoOrdinate){
            await driver.actions([
                await driver.action('pointer')
                .move(await xCoOrdinate, await yCoOrdinate)
                .down()
                .pause(100)
                .up()
                // { action: 'press', options: { x: xCoOrdinate, y: yCoOrdinate }},
                // { action: 'release', options: { }}
            ]);
        }else{
            const { width, height } = await driver.getWindowSize();
            await driver.actions([
                await driver.action('pointer')
                .move(parseInt(width/10), parseInt(height/10))
                .down()
                .up()
                // { action: 'press', options: { x: parseInt(width/10), y: parseInt(height/10) }},
                // { action: 'release', options: { }}
            ]);
        }
        
        await this.switchContext(previousContext);
    }

    async switchContext(context){
        if(await Helper.getCurrentContext() != context){
            switch (context) {
                case "native":
                    await driver.switchContext("NATIVE_APP"); 
                    await Helper.setCurrentContext(context);
                    return;
                case "webview":
                    await driver.switchContext("WEBVIEW"); 
                    await Helper.setCurrentContext(context);
                    return;
                default:
                    await driver.switchContext(context); 
                    await Helper.setCurrentContext(context);
                    return;
            }
        }
    }

    async forceClearElement(element){
        return await this.clearElement(element, true);
    }

    async clearElement(element, force){
        switch(properties.configType){
            case "web":{
                await element.clearValue();
                let value = await this.getElement(element);
                if(!force){
                    await element.clearValue();
                    value = await this.getElement(element);
                    if(await value === '')
                        return;
                }
                await element.click();
                for(let i=0; i < await value.length; i++){
                    await driver.keys('\uE003');
                    await this.sleep(0.1);
                }
                value = await this.getElement(element);
                if(await value === '')
                    return;
                throw Error("Element is not getting cleared");
            }
            case "mweb":{
                let value = await this.getElement(element);
                if(!force){
                    await element.clearValue();
                    value = await this.getElement(element);
                    if(await value === '')
                        return;
                }
                for(let i=0; i < await value.length; i++){
                    await driver.keys('\uE003');
                    await this.sleep(0.1);
                }
                value = await this.getElement(element);
                if(await value === '')
                    return;
                throw Error("Element is not getting cleared");
            }
            case "android":{
                let value = await this.getElement(element);
                if(!force){
                    await driver.elementClear(element)
                    value = await this.getElement(element);
                    if(await value === '')
                        return;
                }
                for(let i=0; i < value.length; i++){
                    await driver.elementSendKeys(element, '\uE003');
                    await this.sleep(0.1);
                }
                value = await this.getElement(element);
                if(await value === '')
                    return;
                throw Error("Element is not getting cleared");
            }
        }
    }

    async getCode(i){
        switch(i){
            case "0":
                return 7;
            case "1":
                return 8;
            case "2":
                return 9;
            case "3":
                return 10;
            case "4":
                return 11;
            case "5":
                return 12;
            case "6":
                return 13;
            case "7":
                return 14;
            case "8":
                return 15;
            case "9":
                return 16;
            case "A":
                return 29;
            case "B":
                return 30;
            case "C":
                return 31;
            case "D":
                return 32;
            case "E":
                return 33;
            case "F":
                return 34;
            case "G":
                return 35;
            case "H":
                return 36;
            case "I":
                return 37;
            case "J":
                return 38;
            case "K":
                return 39;
            case "L":
                return 40;
            case "M":
                return 41;
            case "N":
                return 42;
            case "O":
                return 43;
            case "P":
                return 44;
            case "Q":
                return 45;
            case "R":
                return 46;
            case "S":
                return 47;
            case "T":
                return 48;
            case "U":
                return 49;
            case "V":
                return 50;
            case "W":
                return 51;
            case "X":
                return 52;
            case "Y":
                return 53;
            case "Z":
                return 54;
            case "a":
                return 29;
            case "b":
                return 30;
            case "c":
                return 31;
            case "d":
                return 32;
            case "e":
                return 33;
            case "f":
                return 34;
            case "g":
                return 35;
            case "h":
                return 36;
            case "i":
                return 37;
            case "j":
                return 38;
            case "k":
                return 39;
            case "l":
                return 40;
            case "m":
                return 41;
            case "n":
                return 42;
            case "o":
                return 43;
            case "p":
                return 44;
            case "q":
                return 45;
            case "r":
                return 46;
            case "s":
                return 47;
            case "t":
                return 48;
            case "u":
                return 49;
            case "v":
                return 50;
            case "w":
                return 51;
            case "x":
                return 52;
            case "y":
                return 53;
            case "z":
                return 54;
            case " ":
                return 62;
        }
    }

    async hideKeyboard(){
        let currentContext = Helper.getCurrentContext();
        await this.switchContext("native");
        await driver.hideKeyboard();
        await this.switchContext(currentContext);
    }

    async setElement(element, value){
        switch(properties.configType){
            case "web":
                return await element.setValue(value);
            case "mweb":
                return await element.setValue(value);
            case "android":
                {
                    switch(Helper.getCurrentContext()){
                        case "webview":
                            return await element.setValue(value);
                        case "native":
                            return await driver.elementSendKeys(element, "" + value);
                    }
                }
        }
    }

    async getElement(element){
        switch(properties.configType){
            case "web":
                return await element.getValue();
            case "mweb":
                return await element.getValue();
            case "android":
                return await driver.getElementText(element);
        }
    }

    async savePageSource(context){
        switch (properties.configType) {
            case "web":
                await fs.writeFile( path.resolve( __dirname, "../data/web") +  "/webPageSource.html", await driver.getPageSource(), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });   
                return;
            case "mweb":
                await fs.writeFile( path.resolve( __dirname, "../data/web") +  "/webPageSource.html", await driver.getPageSource(), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });   
                return;
            case "android":
                switch (context ? context : Helper.getCurrentContext()) {
                    case "native":
                        if(context) await this.switchContext("native");
                        await fs.writeFile( path.resolve( __dirname, "../data/app") +  "/nativeRenderedTree.html", await driver.getPageSource(), function(err) {
                            if(err) {
                                return console.log(err);
                            }
                            console.log("The file was saved!");
                        });
                        return;
                    case "webview":
                        if(context) await this.switchContext("webview")
                        await fs.writeFile( path.resolve( __dirname, "../data/app") +  "/webPageSource.html", await driver.getPageSource(), function(err) {
                            if(err) {
                                return console.log(err);
                            }
                            console.log("The file was saved!");
                        });   
                        return;
                    default:
                        return;
                }
                return;
            default:
                return;
        }
    }

    async writeFile(data, relativePath){
        await new Promise(async (resolve, reject)=>{
            await fs.writeFile(relativePath, await data, function(err) {
                if(err) {
                    reject(err);
                }
                resolve();
            }); 
        });
    }

    async switchToMatchingURLWindow(matchingURL, isError = true){
        switch(properties.configType){
            case "android":{
                await this.switchContext("webview");
            }
        }
        let initURL = await driver.getUrl();
        if(await initURL.includes(matchingURL))
            return true;
        let windowsList = await driver.getWindowHandles();
        for(let i=0; i<windowsList.length; i++){
            await driver.switchToWindow(await windowsList[i]);
            let url = await driver.getUrl();
            if(await url.includes(matchingURL)){
                return true;
            }
        }
        if(isError)
            throw new Error("No matching window found");
        return false;
    }

    async goBack(count=1){
        switch(properties.configType){
            case "web":{
                for (let i = 0; i < count; i++) {
                    await driver.back();
                    await this.sleep(0.5);
                }
                return;
            }
            case "mweb":{
                for (let i = 0; i < count; i++) {
                    await driver.back();
                    await this.sleep(0.5);
                }
                return;
            }
            case "android":{
                let currentContext = await Helper.getCurrentContext();
                await this.switchContext("native");
                for (let i = 0; i < count; i++) {
                    await driver.back();
                }
                await this.switchContext(currentContext);
                return;
            }
        }
    }

    async switchToFrame(frameId){
        await driver.switchToFrame(frameId)
    }

    async getUrl(){
        switch(properties.configType){
            case "web" : {
                return await driver.getUrl();

            }
            case "android" : {
                let currentContext = await Helper.getCurrentContext();
                await this.switchContext("webview");
                let url = await driver.getUrl();
                await this.switchContext(currentContext);
                return url;
            }
        }
        
    }

    async pushFile(filePath, fileBinary){
        await this.switchContext("native");
        return await driver.pushFile(filePath, fileBinary)
    }

    async touchScroll(xoffset, yoffset, element){
        return await driver.touchScroll(xoffset, yoffset, element)
    }

    async refresh(){
        switch(properties.configType){
            case "web":{
                return await driver.refresh();
            }
            case "mweb":{
                return await driver.refresh();
            }
            case "android":{
                switch (Helper.getCurrentContext()) {
                    case "native":
                        return await this.refreshFlutterPage();
                    case "webview":
                        return await driver.refresh();
                }
            }
        }
    }
}