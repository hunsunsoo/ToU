package com.welcome.tou.statement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class BranchTradeCountResponseDto {

    private String branchName;
    private Long branchTradeCount;

    public BranchTradeCountResponseDto(String branchName, Long branchTradeCount) {
        this.branchName = branchName;
        this.branchTradeCount = branchTradeCount;
    }


}
