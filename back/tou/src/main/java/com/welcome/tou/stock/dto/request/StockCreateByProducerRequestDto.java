package com.welcome.tou.stock.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class StockCreateByProducerRequestDto {

    private String stockName;
    private Double stockQuantity;
    private String stockUnit;
    private Long stockPrice;

}
