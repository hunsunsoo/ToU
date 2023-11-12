package com.welcome.tou.stock.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class StockCreateInBlockRequestDto {

    private String assetId;
    private String previousAssetId;
    private Long statementSeq;
    private Long branchSeq;
    private String branchLocation;
    private String branchName;
    private String branchContract;
    private String stockName;
    private Long stockQuantity;
    private String stockUnit;
    private String stockDate;
    private String inoutStatus;
    private String useStatus;
}
