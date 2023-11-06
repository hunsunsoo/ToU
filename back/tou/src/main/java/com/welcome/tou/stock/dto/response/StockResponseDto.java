package com.welcome.tou.stock.dto.response;

import com.welcome.tou.stock.domain.Stock;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StockResponseDto {

    private Long stockSeq;
    private LocalDateTime stockDate;
    private Double stockQuantity;
    private String stockUnit;
    private String stockName;
    private Long stockPrice;

    public static StockResponseDto from(Stock stock){

        StockResponseDto response = new StockResponseDto();

        response.stockSeq = stock.getStockSeq();
        response.stockDate = stock.getStockDate();
        response.stockQuantity = stock.getStockQuantity();
        response.stockUnit = stock.getStockUnit();
        response.stockName = stock.getStockName();
        response.stockPrice = stock.getStockPrice();

        return response;
    }
}
