const { properties } = require("../utils/config");
const { Helper } = require("../utils/helper");

class CommonScripts extends Helper{
    constructor(){
        super(__filename);
    }

    async addKYCSuccess(name , mobileNumber){
        await this.executeSQLQuery(`UPDATE kyc_details SET name='${name}',phone='${mobileNumber}' WHERE id='91007757-9c00-4300-8b32-9ba0d088825f'`, properties.centralKYCDBHost, properties.centralKYCDBUsername, properties.centralKYCDBPassword, properties.centralKYCDBName);
    }

    async fetchPolicyID(data, index=0){
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
                                    .setHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzekY1YUowUDU3NXJsWlBsSTNJMGpFVU1yb3c5NERFZ2QwY1hadXNvN0ZRIn0.eyJleHAiOjE3MjY1MDA3ODAsImlhdCI6MTcyNjQ2NDc4MCwianRpIjoiZjY4YWU5NGItMGY5Ni00NGQ1LTk0YWMtNDI4MmJiNzU3N2EwIiwiaXNzIjoiaHR0cHM6Ly9jZW50cmFsLWF1dGgtdWF0LmludGVybmFsLmFja29kZXYuY29tL3JlYWxtcy9TdXJlT3MtZGV2IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImFiMGJkYTE3LTdiM2EtNGM4My1iYTFhLWM0NTIwMDUzZTc2MyIsInR5cCI6IkJlYXJlciIsImF6cCI6IjVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zdXJlb3MtZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjMxLjIwOS45NCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMzEuMjA5Ljk0IiwiY2xpZW50X2lkIjoiNWFkNzI4YjAtNzMzZi00NGE3LTk4N2UtYjk0NmU3MjczMzQxIn0.h1ybyRBVA1tShtaGJpG48ZTOX3K9mLXv3p9qmlsZEKAvLuCyNDptZtHHxoKd460sH7CwBdJjW2CRe1jf0NNCvxklRonCkkgthrvbm4yS-DqeqAAnSju1fBDJ8O-onYNf6NyQ-nlsEpuvjudC0dHckjAHKiZhnthuX8I0xLxrnLAyOi7b6kRxAIJYT440AVPyHbQeVJAhk8bKb1Dn2KyNE4V4sBcyUhUweCtg4d6xzT9XxjGV2HupOj8Cy7kHWZezw3EBF1JyfK-386MK8IBlXnLy7wQDxv5I0f-eCjE3J_8AbSXO2m_WttF9Ib8ImBvXpOa0oDWIuxHwvSOKKGKLxA")
                                    .get()
                                    .getResponse()
                                    .end();
        if(await proposalList.length > 1){
            return await proposalList[index].header.policy_id;
        }else if(await proposalList.length == 1){
            return await proposalList[0].header.policy_id;
        }else{
            throw new Error("No proposals are found under userID : " + userID);
        }

    }

    async backDatePolicy(data, index = 0){
        let policyID = await this.fetchPolicyID(data, index);
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        let currentMonth = (yesterday.getMonth() + 1) < 10 ? "0" + (yesterday.getMonth() +1 ) : "" + (yesterday.getMonth() + 1);
        let travelStartDate = (yesterday.getDate() < 10 ? "0"+ yesterday.getDate() : yesterday.getDate()) + "-" + currentMonth + "-" + yesterday.getFullYear();
        yesterday.setDate(yesterday.getDate() - 1);
        let clonedProposalResponse = await this.request(`https://endorsement-layer.ackosureosuat.com/acko/v1/policy/${policyID}/proposal/clone`)
                .setHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzekY1YUowUDU3NXJsWlBsSTNJMGpFVU1yb3c5NERFZ2QwY1hadXNvN0ZRIn0.eyJleHAiOjE3MjY1MDA3ODAsImlhdCI6MTcyNjQ2NDc4MCwianRpIjoiZjY4YWU5NGItMGY5Ni00NGQ1LTk0YWMtNDI4MmJiNzU3N2EwIiwiaXNzIjoiaHR0cHM6Ly9jZW50cmFsLWF1dGgtdWF0LmludGVybmFsLmFja29kZXYuY29tL3JlYWxtcy9TdXJlT3MtZGV2IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImFiMGJkYTE3LTdiM2EtNGM4My1iYTFhLWM0NTIwMDUzZTc2MyIsInR5cCI6IkJlYXJlciIsImF6cCI6IjVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zdXJlb3MtZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjMxLjIwOS45NCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMzEuMjA5Ljk0IiwiY2xpZW50X2lkIjoiNWFkNzI4YjAtNzMzZi00NGE3LTk4N2UtYjk0NmU3MjczMzQxIn0.h1ybyRBVA1tShtaGJpG48ZTOX3K9mLXv3p9qmlsZEKAvLuCyNDptZtHHxoKd460sH7CwBdJjW2CRe1jf0NNCvxklRonCkkgthrvbm4yS-DqeqAAnSju1fBDJ8O-onYNf6NyQ-nlsEpuvjudC0dHckjAHKiZhnthuX8I0xLxrnLAyOi7b6kRxAIJYT440AVPyHbQeVJAhk8bKb1Dn2KyNE4V4sBcyUhUweCtg4d6xzT9XxjGV2HupOj8Cy7kHWZezw3EBF1JyfK-386MK8IBlXnLy7wQDxv5I0f-eCjE3J_8AbSXO2m_WttF9Ib8ImBvXpOa0oDWIuxHwvSOKKGKLxA")
                .post()
                .setHeader("Content-Type", "application/json")
                .setData({})
                .getResponse()
                .end()
        let clonedProposal = await clonedProposalResponse.cloned_proposal;
        let clonedProposalId = await clonedProposal.proposal_id;
        let proposalData = data.isTravelDate ? {
            "travel_start_date": data.travel_start_date,
            "travel_end_date": data.travel_end_date,
            "policy_start_date":  data.policy_start_date,
            "policy_end_date": data.policy_end_date
        } : {
            "travel_start_date": travelStartDate,
            "policy_start_date": yesterday,
        };
        Object.keys(await proposalData).forEach(key => {
            clonedProposal.header.proposal_data[key] = proposalData[key];
        });
        await console.log(clonedProposal);
        await this.request(`https://proposal-service.ackosureosuat.com/v1/proposals/${clonedProposalId}`)
                                        .setHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzekY1YUowUDU3NXJsWlBsSTNJMGpFVU1yb3c5NERFZ2QwY1hadXNvN0ZRIn0.eyJleHAiOjE3MjY1MDA3ODAsImlhdCI6MTcyNjQ2NDc4MCwianRpIjoiZjY4YWU5NGItMGY5Ni00NGQ1LTk0YWMtNDI4MmJiNzU3N2EwIiwiaXNzIjoiaHR0cHM6Ly9jZW50cmFsLWF1dGgtdWF0LmludGVybmFsLmFja29kZXYuY29tL3JlYWxtcy9TdXJlT3MtZGV2IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImFiMGJkYTE3LTdiM2EtNGM4My1iYTFhLWM0NTIwMDUzZTc2MyIsInR5cCI6IkJlYXJlciIsImF6cCI6IjVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zdXJlb3MtZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjMxLjIwOS45NCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMzEuMjA5Ljk0IiwiY2xpZW50X2lkIjoiNWFkNzI4YjAtNzMzZi00NGE3LTk4N2UtYjk0NmU3MjczMzQxIn0.h1ybyRBVA1tShtaGJpG48ZTOX3K9mLXv3p9qmlsZEKAvLuCyNDptZtHHxoKd460sH7CwBdJjW2CRe1jf0NNCvxklRonCkkgthrvbm4yS-DqeqAAnSju1fBDJ8O-onYNf6NyQ-nlsEpuvjudC0dHckjAHKiZhnthuX8I0xLxrnLAyOi7b6kRxAIJYT440AVPyHbQeVJAhk8bKb1Dn2KyNE4V4sBcyUhUweCtg4d6xzT9XxjGV2HupOj8Cy7kHWZezw3EBF1JyfK-386MK8IBlXnLy7wQDxv5I0f-eCjE3J_8AbSXO2m_WttF9Ib8ImBvXpOa0oDWIuxHwvSOKKGKLxA")
                                        .put()
                                        .setHeader("Content-Type", "application/json")
                                        .setData(clonedProposal)
                                        .getResponse()
                                        .end()
        let lockClonedProposalResponse = await this.request(`https://proposal-service.ackosureosuat.com/v1/proposals/${clonedProposalId}/status`)
                                                .setHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzekY1YUowUDU3NXJsWlBsSTNJMGpFVU1yb3c5NERFZ2QwY1hadXNvN0ZRIn0.eyJleHAiOjE3MjY1MDA3ODAsImlhdCI6MTcyNjQ2NDc4MCwianRpIjoiZjY4YWU5NGItMGY5Ni00NGQ1LTk0YWMtNDI4MmJiNzU3N2EwIiwiaXNzIjoiaHR0cHM6Ly9jZW50cmFsLWF1dGgtdWF0LmludGVybmFsLmFja29kZXYuY29tL3JlYWxtcy9TdXJlT3MtZGV2IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImFiMGJkYTE3LTdiM2EtNGM4My1iYTFhLWM0NTIwMDUzZTc2MyIsInR5cCI6IkJlYXJlciIsImF6cCI6IjVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zdXJlb3MtZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjMxLjIwOS45NCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMzEuMjA5Ljk0IiwiY2xpZW50X2lkIjoiNWFkNzI4YjAtNzMzZi00NGE3LTk4N2UtYjk0NmU3MjczMzQxIn0.h1ybyRBVA1tShtaGJpG48ZTOX3K9mLXv3p9qmlsZEKAvLuCyNDptZtHHxoKd460sH7CwBdJjW2CRe1jf0NNCvxklRonCkkgthrvbm4yS-DqeqAAnSju1fBDJ8O-onYNf6NyQ-nlsEpuvjudC0dHckjAHKiZhnthuX8I0xLxrnLAyOi7b6kRxAIJYT440AVPyHbQeVJAhk8bKb1Dn2KyNE4V4sBcyUhUweCtg4d6xzT9XxjGV2HupOj8Cy7kHWZezw3EBF1JyfK-386MK8IBlXnLy7wQDxv5I0f-eCjE3J_8AbSXO2m_WttF9Ib8ImBvXpOa0oDWIuxHwvSOKKGKLxA")
                                                .post()
                                                .setHeader("Content-Type", "application/json")
                                                .setData({
                                                    "status": "locked"
                                                })
                                                .getResponse()
                                                .end()

        await expect(await lockClonedProposalResponse.status).toEqual('locked');
        let updatedPolicy = await this.request(`https://sureos-policy-shell-layer.ackosureosuat.com/policies/${policyID}/endorsement/${clonedProposalId}`)
                                        .setHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzekY1YUowUDU3NXJsWlBsSTNJMGpFVU1yb3c5NERFZ2QwY1hadXNvN0ZRIn0.eyJleHAiOjE3MjY1MDA3ODAsImlhdCI6MTcyNjQ2NDc4MCwianRpIjoiZjY4YWU5NGItMGY5Ni00NGQ1LTk0YWMtNDI4MmJiNzU3N2EwIiwiaXNzIjoiaHR0cHM6Ly9jZW50cmFsLWF1dGgtdWF0LmludGVybmFsLmFja29kZXYuY29tL3JlYWxtcy9TdXJlT3MtZGV2IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImFiMGJkYTE3LTdiM2EtNGM4My1iYTFhLWM0NTIwMDUzZTc2MyIsInR5cCI6IkJlYXJlciIsImF6cCI6IjVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zdXJlb3MtZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjMxLjIwOS45NCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMzEuMjA5Ljk0IiwiY2xpZW50X2lkIjoiNWFkNzI4YjAtNzMzZi00NGE3LTk4N2UtYjk0NmU3MjczMzQxIn0.h1ybyRBVA1tShtaGJpG48ZTOX3K9mLXv3p9qmlsZEKAvLuCyNDptZtHHxoKd460sH7CwBdJjW2CRe1jf0NNCvxklRonCkkgthrvbm4yS-DqeqAAnSju1fBDJ8O-onYNf6NyQ-nlsEpuvjudC0dHckjAHKiZhnthuX8I0xLxrnLAyOi7b6kRxAIJYT440AVPyHbQeVJAhk8bKb1Dn2KyNE4V4sBcyUhUweCtg4d6xzT9XxjGV2HupOj8Cy7kHWZezw3EBF1JyfK-386MK8IBlXnLy7wQDxv5I0f-eCjE3J_8AbSXO2m_WttF9Ib8ImBvXpOa0oDWIuxHwvSOKKGKLxA")
                                        .post()
                                        .setHeader("Content-Type", "application/json")
                                        .setData({})
                                        .getResponse()
                                        .end()
        await console.log(await updatedPolicy);
    }
}

module.exports = CommonScripts;