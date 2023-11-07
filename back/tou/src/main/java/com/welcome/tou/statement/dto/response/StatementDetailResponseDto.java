package com.welcome.tou.statement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatementDetailResponseDto {

    private Long statementSeq;
    private LocalDateTime tradeDate;
    private Double totalPrice;
    private StatementReqInfoResponseDto reqInfo;
    private StatementResInfoResponseDto resInfo;
    private List<ItemResponseDto> itemList;


}
