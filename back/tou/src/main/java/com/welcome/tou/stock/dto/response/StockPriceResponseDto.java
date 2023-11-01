package com.welcome.tou.stock.dto.response;

import com.welcome.tou.stock.domain.Stock;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockPriceResponseDto {

    private LocalDateTime stockDate;
    private Long stockPrice;

    public static StockPriceResponseDto from(Stock stock){
        StockPriceResponseDto response = new StockPriceResponseDto();

        response.stockDate = stock.getStockDate();
        response.stockPrice = stock.getStockPrice();

        return response;
    }


}
