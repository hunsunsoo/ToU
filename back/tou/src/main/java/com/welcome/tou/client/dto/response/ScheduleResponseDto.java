package com.welcome.tou.client.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class ScheduleResponseDto {

    private Long statementSeq;
    private String branchName;
    private String productName;
    private String statementStatus;
    private int reqORres;
}
