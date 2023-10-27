package com.welcome.tou.client.service;

import com.welcome.tou.client.domain.Company;
import com.welcome.tou.client.domain.CompanyRepository;
import com.welcome.tou.client.dto.request.CompanyCreateDto;
import com.welcome.tou.common.utils.ResultTemplate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClientService {

    private final CompanyRepository companyRepository;

    @Transactional
    public ResultTemplate addCompany(CompanyCreateDto request) {
        Company newCompany = Company.createCompany(request.getCompanyName(), request.getRegistrationNumber(), request.getCompanyLocation(), request.getCompanyContact());

        companyRepository.save(newCompany);
        return ResultTemplate.builder().status(200).data("success").build();
    }
}
