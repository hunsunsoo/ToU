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
public class PreparingListResponseDto {

    private Long statementSeq;
    private String branchName;
    private String productsName;
    private LocalDateTime tradeDate;
}
