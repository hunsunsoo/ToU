package com.welcome.tou.consumer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;


@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class ConsumerResponseDto {

    private Long branchSeq;
    private String branchLocation;
    private String branchName;
    private String branchType;
    private BigDecimal latitude;
    private BigDecimal longitude;

}
