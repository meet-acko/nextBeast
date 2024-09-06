const CommonScripts = require("../pages/commonScript");
const HomePage = require("../pages/home.page");

const pages = {
    commonScripts : new CommonScripts()
}

describe('visual testing', () => {
    it('Add KYC for a number', async () => {
        let mobileNumber = "6013573571";
        let name = "John Doe";
        await pages.commonScripts.addKYCSuccess(name, mobileNumber);
    });

    it.only('Back Date a retail travel policy', async () => {
        let data = {
            mobileNumber : "6013573571",
            policyIndex : 1,
            isTravelDate : true,
            travel_start_date : "01-09-2024",
            travel_end_date : "04-09-2024",
            policy_start_date : "2024-09-01T00:00:00.000+00:00",
            policy_end_date : "2024-09-05T00:00:00.000+00:00",
        };
        await pages.commonScripts.backDatePolicy(data, data.policyIndex);
    });
});