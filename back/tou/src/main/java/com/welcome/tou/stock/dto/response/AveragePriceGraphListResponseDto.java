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
public class AveragePriceGraphListResponseDto {

    private List<AveragePriceListResponseDto> productList;

}
