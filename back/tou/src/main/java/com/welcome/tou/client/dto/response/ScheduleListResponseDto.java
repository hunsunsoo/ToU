package com.welcome.tou.client.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class ScheduleListResponseDto {

    private int year;
    private int month;
    private List<ScheduleResponseDto> ScheduleList;
}
