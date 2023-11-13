package com.welcome.tou.consumer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class ConsumerProductResponseByFabricDto {

    private String productName;
    private List<ConsumerResponseByFabricDto> distribution;
}
