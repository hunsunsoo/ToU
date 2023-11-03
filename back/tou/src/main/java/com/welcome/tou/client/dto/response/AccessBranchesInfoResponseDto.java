package com.welcome.tou.client.dto.response;

import com.welcome.tou.client.domain.Branch;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AccessBranchesInfoResponseDto {

    private Long branchSeq;
    private String branchName;
    private String branchType;

    public static AccessBranchesInfoResponseDto from(Branch branch) {
        AccessBranchesInfoResponseDto response = new AccessBranchesInfoResponseDto();
        response.branchSeq = branch.getBranchSeq();
        response.branchName = branch.getBranchName();
        response.branchType = branch.getBranchType().name();

        return response;

    }
}
