package com.welcome.tou.client.dto.response;

import com.welcome.tou.client.domain.Branch;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class AccessBranchInfoResponseDto {

    private Long branchSeq;
    private String branchName;
    private String branchType;

    public static AccessBranchInfoResponseDto from(Branch branch) {
        AccessBranchInfoResponseDto response = new AccessBranchInfoResponseDto();
        response.branchSeq = branch.getBranchSeq();
        response.branchName = branch.getBranchName();
        response.branchType = branch.getBranchType().name();

        return response;

    }
}
