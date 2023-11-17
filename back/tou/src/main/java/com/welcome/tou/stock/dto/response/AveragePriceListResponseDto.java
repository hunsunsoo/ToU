package com.welcome.tou.stock.dto.response;

import com.welcome.tou.stock.domain.Stock;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AveragePriceListResponseDto {

    private String stockName;
    private List<AveragePriceResponseDto> averagePriceList;





}
