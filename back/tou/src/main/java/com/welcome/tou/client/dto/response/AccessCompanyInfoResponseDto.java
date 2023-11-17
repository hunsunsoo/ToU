package com.welcome.tou.client.dto.response;

import com.welcome.tou.client.domain.Company;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Data
public class AccessCompanyInfoResponseDto {

    private Long companySeq;
    private String companyName;
    private String registrationNumber;
    private String companyLocation;
    private String companyContact;
    private String logoImage;

    public static AccessCompanyInfoResponseDto from(Company company) {
        AccessCompanyInfoResponseDto response = new AccessCompanyInfoResponseDto();
        response.companySeq = company.getCompanySeq();
        response.companyName = company.getCompanyName();
        response.registrationNumber = company.getRegistrationNumber();
        response.companyLocation = company.getCompanyLocation();
        response.companyContact = company.getCompanyContact();
        response.logoImage = company.getLogoImage();

        return response;
    }
}
