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
public class AveragePriceResponseDto {

    private String stockDate;
    private Long stockPrice;

}
