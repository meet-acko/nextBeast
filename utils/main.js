const Mocha = require("mocha");
const argv = require("minimist")(process.argv.slice(2));

const mochaMain = new Mocha({
    reporter: "mocha-multi-reporters",
    reporterOptions: {
        reporterEnabled: "mocha-allure-reporter, mocha-jenkins-reporter",
        mochaJenkinsReporterReporterOptions: {
            junit_report_name: "Tests",
            junit_report_path: "report.xml",
            junit_report_stack: 1,
        },
        mochaAllureReporterReporterOptions: {
            targetDir: __dirname + "/../allure-results",
        },
    }, 
    timeout: 3 * 60 * 60 * 1000,
});

try {
    argv["_"].unshift("utils/hooks.js");
    mochaMain.files = argv["_"];
    mochaMain.run((failures) => {
        process.on("exit", () => process.exit(failures));
    });
} catch (err) {
    console.error(`Test suite error: ${err}`);
}