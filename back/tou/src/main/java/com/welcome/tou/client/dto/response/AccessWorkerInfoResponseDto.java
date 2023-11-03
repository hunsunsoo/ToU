package com.welcome.tou.client.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class AccessWorkerInfoResponseDto {

    private String workerName;
    private String loginId;
}
