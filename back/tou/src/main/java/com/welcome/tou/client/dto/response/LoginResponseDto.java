package com.welcome.tou.client.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class LoginResponseDto {

    private String accessToken;
    private String refreshToken;
    private AccessWorkerInfoResponseDto worker;
    private AccessCompanyInfoResponseDto company;
    private List<AccessBranchesInfoResponseDto> branches;

}
