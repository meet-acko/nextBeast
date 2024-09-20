const CommonScripts = require("../pages/commonScript");
const HomePage = require("../pages/home.page");

const pages = {
    commonScripts : new CommonScripts()
}

describe('visual testing', () => {
    it.only('Add KYC for a number', async () => {
        let mobileNumber = "8892082613";
        let name = "John Doe";
        await pages.commonScripts.addKYCSuccess(name, mobileNumber);
    });

    it('Back Date a retail travel policy', async () => {
        let data = {
            mobileNumber : "8892082613",
            policyIndex : 0,
            isTravelDate : true,
            travel_start_date : "06-09-2024",
            travel_end_date : "20-09-2024",
            policy_start_date : "2024-08-23T00:00:00.000+00:00",
            policy_end_date : "2024-09-23T00:00:00.000+00:00",
        };
        await pages.commonScripts.backDatePolicy(data, data.policyIndex);
    });
});