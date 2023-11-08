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


    private Long companySeq;
    private String companyName;
    private String registrationNumber;
    private Long branchSeq;
    private String branchName;
    private String branchLocation;
    private String branchContact;
    private Branch.BranchType branchType;
    private Long workerSeq;
    private String workerName;

    public static StatementReqInfoResponseDto from(Statement statement){
        StatementReqInfoResponseDto response = new StatementReqInfoResponseDto();

        Company company = statement.getReqBranch().getCompany();
        response.companySeq = company.getCompanySeq();
        response.companyName = company.getCompanyName();
        response.registrationNumber = company.getRegistrationNumber();
        response.branchSeq = statement.getReqBranch().getBranchSeq();
        response.branchName = statement.getReqBranch().getBranchName();
        response.branchLocation = statement.getReqBranch().getBranchLocation();
        response.branchContact = statement.getReqBranch().getBranchContact();
        response.branchType = statement.getReqBranch().getBranchType();
        response.workerSeq = statement.getReqWorker().getWorkerSeq();
        response.workerName = statement.getReqWorker().getWorkerName();

        return response;
    }



}
