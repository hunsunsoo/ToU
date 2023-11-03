package com.welcome.tou.stock.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class StockCreateByOfficialsRequestDto {

    private Long branchSeq;
    private Long beforeStockSeq;

    private String newStockName;
    private Double newStockQuantity;
    private String newStockUnit;
    private Long newStockPrice;
}
