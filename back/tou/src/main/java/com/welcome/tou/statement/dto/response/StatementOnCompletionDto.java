package com.welcome.tou.statement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class StatementOnCompletionDto {

    private Long statementSeq;
    private Long reqBranchSeq;
    private String reqBranchName;
    private Long resBranchSeq;
    private String resBranchName;
    private String productName;
    private LocalDateTime tradeDate;

}
