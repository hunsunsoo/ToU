package com.welcome.tou.client.service;

import com.welcome.tou.client.domain.*;
import com.welcome.tou.client.dto.request.CompanyCreateDto;
import com.welcome.tou.client.dto.request.LoginRequestDto;
import com.welcome.tou.client.dto.response.*;
import com.welcome.tou.common.exception.MismatchException;
import com.welcome.tou.common.exception.NotFoundException;
import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.security.jwt.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@DependsOn("JwtService")
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClientService {

    private final CompanyRepository companyRepository;
    private final WorkerRepository workerRepository;
    private final BranchRepository branchRepository;

    private final JwtService jwtService;

    private final PasswordEncoder passwordEncoder;

    public ResultTemplate getBranchListOfCompany(Long companySeq) {

        companyRepository.findById(companySeq).orElseThrow(() ->
                new NotFoundException(NotFoundException.COMPANY_NOT_FOUND));

        List<BranchResponseDto> branchList = branchRepository.findByCompanySeq(companySeq)
                .stream().map(branch -> {
                    return BranchResponseDto.builder().branchName(branch.getBranchName())
                            .branchSeq(branch.getBranchSeq()).build();
                }).collect(Collectors.toList());


        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(branchList).build();
    }

    @Transactional
    public ResultTemplate<?> login(LoginRequestDto request) {
        Worker worker = workerRepository.findByLoginId(request.getLoginId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        boolean matches = passwordEncoder.matches(request.getPassword(), worker.getPassword());

        if (!matches) {
            throw new MismatchException(MismatchException.PASSWORD_MISMATCH);
        }

        String accessToken = jwtService.createAccessToken(worker);
        String refreshToken = jwtService.createRefreshToken();

        worker.updateRefreshToken(refreshToken);
        workerRepository.save(worker);

        Company myCompany = worker.getCompany();

        List<Branch> branches = branchRepository.findByCompanySeq(myCompany.getCompanySeq());

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .worker(AccessWorkerInfoResponseDto.builder().workerName(worker.getWorkerName()).loginId(worker.getLoginId()).role(worker.getRole().name()).build())
                .company(AccessCompanyInfoResponseDto.from(myCompany))
                .branches(
                        branches.stream().map(branch -> {
                            return AccessBranchesInfoResponseDto.from(branch);
                        }).collect(Collectors.toList())
                ).build();

        return ResultTemplate.builder().status(200).data(loginResponseDto).build();
    }


    @Transactional
    public ResultTemplate<?> addCompany(CompanyCreateDto request) {
        Company newCompany = Company.createCompany(request.getCompanyName(), request.getRegistrationNumber(), request.getCompanyLocation(), request.getCompanyContact());

        companyRepository.save(newCompany);
        return ResultTemplate.builder().status(200).data("success").build();
    }

}
