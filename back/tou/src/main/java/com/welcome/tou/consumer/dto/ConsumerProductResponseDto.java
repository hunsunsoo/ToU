package com.welcome.tou.consumer.dto;

import com.welcome.tou.consumer.dto.ConsumerResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class ConsumerProductResponseDto {

    private String productName;
    private List<ConsumerResponseDto> distribution;
}
