package com.welcome.tou.statement.dto.response;

import com.welcome.tou.client.domain.Branch;
import com.welcome.tou.client.domain.Company;
import com.welcome.tou.statement.domain.Statement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatementReqInfoResponseDto {

    private String companyName;
    private String registrationNumber;
    private String branchName;
    private String branchLocation;
    private String branchContact;
    private Branch.BranchType branchType;
    private String workerName;

    public static StatementReqInfoResponseDto from(Statement statement){
        StatementReqInfoResponseDto response = new StatementReqInfoResponseDto();

        Company company = statement.getReqBranch().getCompany();
        response.companyName = company.getCompanyName();
        response.registrationNumber = company.getRegistrationNumber();
        response.branchName = statement.getReqBranch().getBranchName();
        response.branchLocation = statement.getReqBranch().getBranchLocation();
        response.branchContact = statement.getReqBranch().getBranchContact();
        response.branchType = statement.getReqBranch().getBranchType();
        response.workerName = statement.getReqWorker().getWorkerName();

        return response;
    }



}
