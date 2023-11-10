package com.ssafy.tou.domain.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockRequestDto {

    private String assetId;

    private String stockSeq;
    private String statementSeq;
    private String branchSeq;
    private String branchLocation;
    private String branchName;
    private String branchContract;
    private String stockName;
    private String stockQuantity;
    private String stockUnit;
    private String stockDate;
    private String inoutStatus;
    private String useStatus;


}
