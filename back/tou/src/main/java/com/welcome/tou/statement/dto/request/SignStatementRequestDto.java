package com.welcome.tou.statement.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class SignStatementRequestDto {

    private Long statementSeq;
    private String type;

}
