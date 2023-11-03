package com.welcome.tou.client.dto.response;

import com.welcome.tou.client.domain.Branch;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class AccessInfoResponseDto {

    private AccessWorkerInfoResponseDto worker;
    private AccessCompanyInfoResponseDto company;
    private List<AccessBranchesInfoResponseDto> branches;

}
