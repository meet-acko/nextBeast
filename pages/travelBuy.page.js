const { Helper } = require("../utils/helper");

class TravelBuyPage extends Helper{
    constructor(){
        super(__filename);
    }

    async goToTravelBuyJourney(data){
        await this.clickElement(await this.findElement("travelCTAOnHomePage"));
        await this.clickElement(await this.findElement("contentContains", "Get international"));
        await this.clickElement(await this.findElement("textContains", "Pick from our standard plans"));
        await this.clickElement(await this.findElement("countryDropdown"));
        await this.clickElement(await this.findElement("textContains", "Indonesia"));
        await this.clickElement(await this.findElement("textContains", "Continue"));
        await this.clickElement(await this.findElement("textContains", "When"));
        await this.switchToMatchingURLWindow("travel");
        await this.clickElement(await this.findElement("nextMonthsFirstDate", "May"));
        await this.clickElement(await this.findElement("nextMonthsFifthDate", "May"));
        await this.clickElement(await this.findElement("doneButton"));
        await this.clickElement(await this.findElement("adultMemberAdd"));
        await this.clickElement(await this.findElement("textContainsWeb", "Continue"));
        // await this.findElement("textContainsWeb", "Price breakup");
        await this.clickElement(await this.findElement("textContainsWeb", "$100,000"));
        await this.findElement("textContainsWeb", "Price breakup");
        await this.findElement("textContainsWeb", "Doctor consultation");
        await this.clickElement(await this.findElement("textContainsWeb", "Continue"));
        // await this.findElement("textContainsWeb", "Price breakup");
        await this.clickElement(await this.findElement("addTravelAddOns", "sports injury"));
        // await this.findElement("textContainsWeb", "Price breakup");
        await this.clickElement(await this.findElement("addTravelAddOns", "Booking denial"));
        await this.findElement("textContainsWeb", "Price breakup");
        await this.clickElement(await this.findElement("textContainsWeb", "Continue"));
        await this.clickElement(await this.findElement("travellerDetailInputs", "Full name"));
        await this.sendKeys(data.fullName);
        await this.clickElement(await this.findElement("dateInputs", "dd"));
        await this.sendKeys(data.dobDate);
        await this.clickElement(await this.findElement("dateInputs", "mm"));
        await this.sendKeys(data.dobMonth);
        await this.clickElement(await this.findElement("dateInputs", "yyyy"));
        await this.sendKeys(data.dobYear);
        await this.clickElement(await this.findElement("genderLabel"));
        await this.clickElement(await this.findElement("textContainsWeb", "Male"));
        await this.clickElement(await this.findElement("travellerDetailInputs", "Pincode"));
        await this.sendKeys(data.pincode);
        // await this.clickElement(await this.findElement("travellerDetailInputs", "Passport"));
        // await this.sendKeys(data.passport);
        await this.clickElement(await this.findElement("travellerDetailInputs", "Email"));
        await this.sendKeys(data.email);
        await this.clickElement(await this.findElement("textContainsWeb", "Continue"));
        await this.clickElement(await this.findElement("textContainsWeb", "(including GST)"));
        await this.clickElement(await this.findElement("textContainsWeb", "Pay securely"));

        
        

        // await this.sleep(5);
    }

    async fetchPolicyID(data){
        let apiResponse = await this.request(`https://entity-service.internal.ackodev.com/api/user/get/?phone=${await data.mobileNumber}`)
                                    .get()
                                    .getResponse()
                                    .end();
        let userID;
        if("id" in apiResponse){
            userID = await apiResponse.id;
        }else{
            throw new Error("User Id not found in entity service");
        }
        let proposalList = await this.request(`https://sureos-policy-service.internal.ackodev.com/policy-service/v1/policies?userId=${await userID}`)
                                    .get()
                                    .getResponse()
                                    .end();
        if(await proposalList.length > 1){
            for(let i=0; i < await proposalList.length; i++){
                if((await proposalList[i].insured[0].parameters.full_name.value).includes(data.fullName)){
                    return await proposalList[i].header.policy_id;
                }
            }
        }else if(await proposalList.length == 1){
            return await proposalList[0].header.policy_id;
        }else{
            throw new Error("No proposals are found under userID : " + userID);
        }

    }

    async backDatePolicy(data){
        let policyID = await this.fetchPolicyID(data);
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        let currentMonth = (yesterday.getMonth() + 1) < 10 ? "0" + (yesterday.getMonth() +1 ) : "" + (yesterday.getMonth() + 1);
        let travelStartDate = yesterday.getDate() + "-" + currentMonth + "-" + yesterday.getFullYear();
        yesterday.setDate(yesterday.getDate() - 1);
        let clonedProposalResponse = await this.request(`https://endorsement-layer.ackosureosuat.com/acko/v1/policy/${policyID}/proposal/clone`)
                .post()
                .setHeader("Content-Type", "application/json")
                .setData({})
                .getResponse()
                .end()
        let clonedProposal = await clonedProposalResponse.cloned_proposal;
        let clonedProposalId = await clonedProposal.proposal_id;
        let proposalData = {
            "travel_start_date": travelStartDate,
            "policy_start_date": yesterday,
        };
        Object.keys(await proposalData).forEach(key => {
            clonedProposal.header.proposal_data[key] = proposalData[key];
        });
        await this.request(`https://proposal-service.ackosureosuat.com/v1/proposals/${clonedProposalId}`)
                                        .put()
                                        .setHeader("Content-Type", "application/json")
                                        .setData(clonedProposal)
                                        .getResponse()
                                        .end()
        
        let lockClonedProposalResponse = await this.request(`https://proposal-service.ackosureosuat.com/v1/proposals/${clonedProposalId}/status`)
                                                .post()
                                                .setHeader("Content-Type", "application/json")
                                                .setData({
                                                    "status": "locked"
                                                })
                                                .getResponse()
                                                .end()

        await expect(await lockClonedProposalResponse.status).toEqual('locked');
        let updatedPolicy = await this.request(`https://sureos-policy-shell-layer.ackosureosuat.com/policies/${policyID}/endorsement/${clonedProposalId}`)
                                        .post()
                                        .setHeader("Content-Type", "application/json")
                                        .setData({})
                                        .getResponse()
                                        .end()
        // await console.log(await updatedPolicy);
    }

    async skipKYC(){
        await this.clickElement(await this.findElement("textContains", "Complete KYC"));
        await this.clickElement(await this.findElement("textContains", "Skip"));
        await this.clickElement(await this.findElement("textContains", "do it later"));
    }
    async goToMyPolicy(){
        await this.clickElement(await this.findElement("textContains", "View my policy"));
    }
}

module.exports = TravelBuyPage;