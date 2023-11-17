package com.welcome.tou.consumer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;


@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class ConsumerResponseByFabricDto {

    private Long branchSeq;
    private String branchLocation;
    private String branchName;
    private String branchType;
    private double latitude;
    private double longitude;
    private String stockDate;

}
