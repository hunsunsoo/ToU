package com.welcome.tou.statement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class AddStatementResponseDto {

    private String message;
    private Long statementSeq;
}
