package com.welcome.tou.statement.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class StockUpdateInBlockRequestDto {

    private String assetId;
}
