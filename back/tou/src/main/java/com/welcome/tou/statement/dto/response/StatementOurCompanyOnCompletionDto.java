package com.welcome.tou.statement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class StatementOurCompanyOnCompletionDto {

    private String companyName;
    private List<StatementOnCompletionDto> statementList;
}
