package com.welcome.tou.client.service;

import com.welcome.tou.client.domain.Company;
import com.welcome.tou.client.domain.CompanyRepository;
import com.welcome.tou.client.domain.Worker;
import com.welcome.tou.client.domain.WorkerRepository;
import com.welcome.tou.client.dto.request.CompanyCreateDto;
import com.welcome.tou.client.dto.request.LoginRequestDto;
import com.welcome.tou.client.dto.response.LoginResponseDto;
import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.security.jwt.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.DependsOn;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@DependsOn("JwtService")
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClientService {

    private final CompanyRepository companyRepository;
    private final WorkerRepository workerRepository;

    private final JwtService jwtService;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    public ResultTemplate login(LoginRequestDto request) {
        Worker worker = workerRepository.findByLoginId(request.getLoginId())
                .orElseThrow(() -> new NoSuchElementException("Worker Not Found"));

        boolean matches = passwordEncoder.matches(worker.getPassword(), request.getPassword());

        if (!matches) {
            // 일치하지 않을 때 던질거
            // throw new
        }

        String accessToken = jwtService.createAccessToken(worker);
        String refreshToken = jwtService.createRefreshToken();

        worker.updateRefreshToken(refreshToken);
        workerRepository.save(worker);

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        return ResultTemplate.builder().status(200).data(loginResponseDto).build();
    }

    @Transactional
    public ResultTemplate addCompany(CompanyCreateDto request) {
        Company newCompany = Company.createCompany(request.getCompanyName(), request.getRegistrationNumber(), request.getCompanyLocation(), request.getCompanyContact());
        log.info("토큰이 틀렸는데 여기오긴함?");
        companyRepository.save(newCompany);
        return ResultTemplate.builder().status(200).data("success").build();
    }

}
