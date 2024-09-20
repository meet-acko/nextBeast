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
                                    .setHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzekY1YUowUDU3NXJsWlBsSTNJMGpFVU1yb3c5NERFZ2QwY1hadXNvN0ZRIn0.eyJleHAiOjE3MjY4NjU0MTAsImlhdCI6MTcyNjgyOTQxMCwianRpIjoiNDBjNTcwNDktYmY3YS00ODcwLWJkODQtMDg1NWJhYTIyMDFkIiwiaXNzIjoiaHR0cHM6Ly9jZW50cmFsLWF1dGgtdWF0LmludGVybmFsLmFja29kZXYuY29tL3JlYWxtcy9TdXJlT3MtZGV2IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImFiMGJkYTE3LTdiM2EtNGM4My1iYTFhLWM0NTIwMDUzZTc2MyIsInR5cCI6IkJlYXJlciIsImF6cCI6IjVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zdXJlb3MtZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjMxLjIyMy43NiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMzEuMjIzLjc2IiwiY2xpZW50X2lkIjoiNWFkNzI4YjAtNzMzZi00NGE3LTk4N2UtYjk0NmU3MjczMzQxIn0.bmczW33s3icunGyehALaL90JgHU1pd9E9cvj4ted5QoSKhkWzejD0tC8azHFnf4YkiUDjRoqmi98OOL9AY4rNGz0ENbDwbHA0gpoznB2JIFt8Kiomx1Zo8FLFZ_2myJYpAaALKHj0AiyzuJvHSJye95VG8n4WIgz5ZaGNNyY-4nhyALhy7ADxaWRw5kh07Ko43Je0txUu2q1OdXkn9Sl2K4u828ZtExbG0jmaMqBYyL_Wj7Aq-h-d-wfGh_nGe5z7RXVv7-FILMX-9bZbpCO2oy-dHXNJM4ZPvN1gjWqaUM7uq_FqRe-A8t_c7Emlv-Y0egDIgN1-OJY9jKaNz2k2g")
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
                .setHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzekY1YUowUDU3NXJsWlBsSTNJMGpFVU1yb3c5NERFZ2QwY1hadXNvN0ZRIn0.eyJleHAiOjE3MjY4NjU0MTAsImlhdCI6MTcyNjgyOTQxMCwianRpIjoiNDBjNTcwNDktYmY3YS00ODcwLWJkODQtMDg1NWJhYTIyMDFkIiwiaXNzIjoiaHR0cHM6Ly9jZW50cmFsLWF1dGgtdWF0LmludGVybmFsLmFja29kZXYuY29tL3JlYWxtcy9TdXJlT3MtZGV2IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImFiMGJkYTE3LTdiM2EtNGM4My1iYTFhLWM0NTIwMDUzZTc2MyIsInR5cCI6IkJlYXJlciIsImF6cCI6IjVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zdXJlb3MtZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjMxLjIyMy43NiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMzEuMjIzLjc2IiwiY2xpZW50X2lkIjoiNWFkNzI4YjAtNzMzZi00NGE3LTk4N2UtYjk0NmU3MjczMzQxIn0.bmczW33s3icunGyehALaL90JgHU1pd9E9cvj4ted5QoSKhkWzejD0tC8azHFnf4YkiUDjRoqmi98OOL9AY4rNGz0ENbDwbHA0gpoznB2JIFt8Kiomx1Zo8FLFZ_2myJYpAaALKHj0AiyzuJvHSJye95VG8n4WIgz5ZaGNNyY-4nhyALhy7ADxaWRw5kh07Ko43Je0txUu2q1OdXkn9Sl2K4u828ZtExbG0jmaMqBYyL_Wj7Aq-h-d-wfGh_nGe5z7RXVv7-FILMX-9bZbpCO2oy-dHXNJM4ZPvN1gjWqaUM7uq_FqRe-A8t_c7Emlv-Y0egDIgN1-OJY9jKaNz2k2g")
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
                                        .setHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzekY1YUowUDU3NXJsWlBsSTNJMGpFVU1yb3c5NERFZ2QwY1hadXNvN0ZRIn0.eyJleHAiOjE3MjY4NjU0MTAsImlhdCI6MTcyNjgyOTQxMCwianRpIjoiNDBjNTcwNDktYmY3YS00ODcwLWJkODQtMDg1NWJhYTIyMDFkIiwiaXNzIjoiaHR0cHM6Ly9jZW50cmFsLWF1dGgtdWF0LmludGVybmFsLmFja29kZXYuY29tL3JlYWxtcy9TdXJlT3MtZGV2IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImFiMGJkYTE3LTdiM2EtNGM4My1iYTFhLWM0NTIwMDUzZTc2MyIsInR5cCI6IkJlYXJlciIsImF6cCI6IjVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zdXJlb3MtZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjMxLjIyMy43NiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMzEuMjIzLjc2IiwiY2xpZW50X2lkIjoiNWFkNzI4YjAtNzMzZi00NGE3LTk4N2UtYjk0NmU3MjczMzQxIn0.bmczW33s3icunGyehALaL90JgHU1pd9E9cvj4ted5QoSKhkWzejD0tC8azHFnf4YkiUDjRoqmi98OOL9AY4rNGz0ENbDwbHA0gpoznB2JIFt8Kiomx1Zo8FLFZ_2myJYpAaALKHj0AiyzuJvHSJye95VG8n4WIgz5ZaGNNyY-4nhyALhy7ADxaWRw5kh07Ko43Je0txUu2q1OdXkn9Sl2K4u828ZtExbG0jmaMqBYyL_Wj7Aq-h-d-wfGh_nGe5z7RXVv7-FILMX-9bZbpCO2oy-dHXNJM4ZPvN1gjWqaUM7uq_FqRe-A8t_c7Emlv-Y0egDIgN1-OJY9jKaNz2k2g")
                                        .put()
                                        .setHeader("Content-Type", "application/json")
                                        .setData(clonedProposal)
                                        .getResponse()
                                        .end()
        let lockClonedProposalResponse = await this.request(`https://proposal-service.ackosureosuat.com/v1/proposals/${clonedProposalId}/status`)
                                                .setHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzekY1YUowUDU3NXJsWlBsSTNJMGpFVU1yb3c5NERFZ2QwY1hadXNvN0ZRIn0.eyJleHAiOjE3MjY4NjU0MTAsImlhdCI6MTcyNjgyOTQxMCwianRpIjoiNDBjNTcwNDktYmY3YS00ODcwLWJkODQtMDg1NWJhYTIyMDFkIiwiaXNzIjoiaHR0cHM6Ly9jZW50cmFsLWF1dGgtdWF0LmludGVybmFsLmFja29kZXYuY29tL3JlYWxtcy9TdXJlT3MtZGV2IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImFiMGJkYTE3LTdiM2EtNGM4My1iYTFhLWM0NTIwMDUzZTc2MyIsInR5cCI6IkJlYXJlciIsImF6cCI6IjVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zdXJlb3MtZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjMxLjIyMy43NiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMzEuMjIzLjc2IiwiY2xpZW50X2lkIjoiNWFkNzI4YjAtNzMzZi00NGE3LTk4N2UtYjk0NmU3MjczMzQxIn0.bmczW33s3icunGyehALaL90JgHU1pd9E9cvj4ted5QoSKhkWzejD0tC8azHFnf4YkiUDjRoqmi98OOL9AY4rNGz0ENbDwbHA0gpoznB2JIFt8Kiomx1Zo8FLFZ_2myJYpAaALKHj0AiyzuJvHSJye95VG8n4WIgz5ZaGNNyY-4nhyALhy7ADxaWRw5kh07Ko43Je0txUu2q1OdXkn9Sl2K4u828ZtExbG0jmaMqBYyL_Wj7Aq-h-d-wfGh_nGe5z7RXVv7-FILMX-9bZbpCO2oy-dHXNJM4ZPvN1gjWqaUM7uq_FqRe-A8t_c7Emlv-Y0egDIgN1-OJY9jKaNz2k2g")
                                                .post()
                                                .setHeader("Content-Type", "application/json")
                                                .setData({
                                                    "status": "locked"
                                                })
                                                .getResponse()
                                                .end()

        await expect(await lockClonedProposalResponse.status).toEqual('locked');
        let updatedPolicy = await this.request(`https://sureos-policy-shell-layer.ackosureosuat.com/policies/${policyID}/endorsement/${clonedProposalId}`)
                                        .setHeader("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzekY1YUowUDU3NXJsWlBsSTNJMGpFVU1yb3c5NERFZ2QwY1hadXNvN0ZRIn0.eyJleHAiOjE3MjY4NjU0MTAsImlhdCI6MTcyNjgyOTQxMCwianRpIjoiNDBjNTcwNDktYmY3YS00ODcwLWJkODQtMDg1NWJhYTIyMDFkIiwiaXNzIjoiaHR0cHM6Ly9jZW50cmFsLWF1dGgtdWF0LmludGVybmFsLmFja29kZXYuY29tL3JlYWxtcy9TdXJlT3MtZGV2IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImFiMGJkYTE3LTdiM2EtNGM4My1iYTFhLWM0NTIwMDUzZTc2MyIsInR5cCI6IkJlYXJlciIsImF6cCI6IjVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zdXJlb3MtZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjMxLjIyMy43NiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LTVhZDcyOGIwLTczM2YtNDRhNy05ODdlLWI5NDZlNzI3MzM0MSIsImNsaWVudEFkZHJlc3MiOiIxNzIuMzEuMjIzLjc2IiwiY2xpZW50X2lkIjoiNWFkNzI4YjAtNzMzZi00NGE3LTk4N2UtYjk0NmU3MjczMzQxIn0.bmczW33s3icunGyehALaL90JgHU1pd9E9cvj4ted5QoSKhkWzejD0tC8azHFnf4YkiUDjRoqmi98OOL9AY4rNGz0ENbDwbHA0gpoznB2JIFt8Kiomx1Zo8FLFZ_2myJYpAaALKHj0AiyzuJvHSJye95VG8n4WIgz5ZaGNNyY-4nhyALhy7ADxaWRw5kh07Ko43Je0txUu2q1OdXkn9Sl2K4u828ZtExbG0jmaMqBYyL_Wj7Aq-h-d-wfGh_nGe5z7RXVv7-FILMX-9bZbpCO2oy-dHXNJM4ZPvN1gjWqaUM7uq_FqRe-A8t_c7Emlv-Y0egDIgN1-OJY9jKaNz2k2g")
                                        .post()
                                        .setHeader("Content-Type", "application/json")
                                        .setData({})
                                        .getResponse()
                                        .end()
        await console.log(await updatedPolicy);
    }
}

module.exports = CommonScripts;