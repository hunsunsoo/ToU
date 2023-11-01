package com.welcome.tou.stock.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockListResponseDto {

    private List<StockResponseDto> stockList;

    public static StockListResponseDto from(List<StockResponseDto> list){
        StockListResponseDto response = new StockListResponseDto();
        response.stockList = list;
        return response;
    }
}
