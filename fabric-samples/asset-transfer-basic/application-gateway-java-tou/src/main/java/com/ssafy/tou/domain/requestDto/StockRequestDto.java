package com.ssafy.tou.domain.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockRequestDto {

    private String statementSeq;
    private String branchSeq;
    private String branchLocation;

}
