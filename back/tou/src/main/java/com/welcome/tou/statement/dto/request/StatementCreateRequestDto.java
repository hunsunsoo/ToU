package com.welcome.tou.statement.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class StatementCreateRequestDto {

    private Long requestBranch;
    private Long responseBranch;
    private LocalDateTime tradeDate;
    private List<Long> items;
}
