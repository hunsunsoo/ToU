package com.welcome.tou.statement.dto.response;

import com.welcome.tou.statement.domain.Statement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class AppStatementResponseDto {

    private Long statementSeq;
    private Long branchSeq;
    private String branchName;
    private String productName;
    private LocalDateTime tradeDate;
    private String statementStatus;
    private int reqORres;

}
