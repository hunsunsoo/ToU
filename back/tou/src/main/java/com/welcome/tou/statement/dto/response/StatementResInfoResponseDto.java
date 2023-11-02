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
public class StatementResInfoResponseDto {

    private String companyName;
    private String registrationNumber;
    private String branchName;
    private String branchLocation;
    private String branchContact;
    private Branch.BranchType branchType;
    private String workerName;

    public static StatementResInfoResponseDto from(Statement statement){
        StatementResInfoResponseDto response = new StatementResInfoResponseDto();

        Company company = statement.getResBranch().getCompany();
        response.companyName = company.getCompanyName();
        response.registrationNumber = company.getRegistrationNumber();
        response.branchName = statement.getResBranch().getBranchName();
        response.branchLocation = statement.getResBranch().getBranchLocation();
        response.branchContact = statement.getResBranch().getBranchContact();
        response.branchType = statement.getResBranch().getBranchType();
        response.workerName = statement.getResWorker().getWorkerName();

        return response;
    }
}
