package com.welcome.tou.statement.dto.response;

import com.welcome.tou.statement.domain.Item;
import com.welcome.tou.stock.domain.Stock;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemResponseDto {

    private Long stockSeq;
    private String stockCode;
    private Double stockQuantity;
    private String stockUnit;
    private Long stockPrice;
    private Double stockTotalPrice;
    private String note;

    public static ItemResponseDto from(Item item){
        ItemResponseDto responseDto = new ItemResponseDto();
        Stock stock = item.getStock();
        responseDto.stockSeq = stock.getStockSeq();
        responseDto.stockCode = stock.getStockCode();
        responseDto.stockQuantity = stock.getStockQuantity();
        responseDto.stockUnit = stock.getStockUnit();
        responseDto.stockPrice = stock.getStockPrice();

        responseDto.stockTotalPrice = responseDto.stockPrice * responseDto.stockQuantity;
        responseDto.note = item.getNote();

        return responseDto;
    }
}
