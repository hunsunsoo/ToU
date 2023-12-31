package com.welcome.tou.client.service;

import com.welcome.tou.client.domain.*;
import com.welcome.tou.client.dto.request.CompanyCreateDto;
import com.welcome.tou.client.dto.request.PassAuthRequestDto;
import com.welcome.tou.client.dto.request.LoginRequestDto;
import com.welcome.tou.client.dto.response.*;
import com.welcome.tou.common.exception.MismatchException;
import com.welcome.tou.common.exception.NotFoundException;
import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.security.jwt.service.JwtService;

import com.welcome.tou.statement.domain.ItemRepository;
import com.welcome.tou.statement.domain.Statement;
import com.welcome.tou.statement.domain.StatementRepository;
import com.welcome.tou.stock.domain.Stock;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
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
    private final StatementRepository statementRepository;
    private final ItemRepository itemRepository;
    private final PassRepository passRepository;

    private final JwtService jwtService;

    private final PasswordEncoder passwordEncoder;


    public ResultTemplate<?> getCompanyList() {
        List<Company> companyList = companyRepository.findAll();

        if (companyList == null || companyList.size() == 0) {
            throw new NotFoundException(NotFoundException.COMPANY_NOT_FOUND);
        }

        List<SimpleCompanyInfoResponseDto> simpleCompanyList = companyList.stream().map(company -> {
            return SimpleCompanyInfoResponseDto.builder()
                    .companySeq(company.getCompanySeq())
                    .companyName(company.getCompanyName())
                    .build();
        }).collect(Collectors.toList());

        CompanyListResponseDto responseDto = CompanyListResponseDto.builder()
                .companyList(simpleCompanyList)
                .build();

        return ResultTemplate.builder().status(200).data(responseDto).build();
    }

    public ResultTemplate<?> getScheduleList(UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch myBranch = reqWorker.getBranch();

        int year = LocalDateTime.now().getYear();
        int month = LocalDateTime.now().getMonthValue();

        List<Statement> scheduleList = statementRepository.findStatementsForSchedule(myBranch.getBranchSeq());

        if(scheduleList == null || scheduleList.size() == 0) {
            throw new NotFoundException(NotFoundException.STATEMENT_NOT_FOUND);
        }

        ScheduleListResponseDto responseDto = ScheduleListResponseDto.builder()
                .ScheduleList(scheduleList.stream()
                        .sorted(Comparator.comparing(Statement::getTradeDate))
                        .map(statement -> {
                            List<Stock> stocks = itemRepository.findStockByStatementSeq(statement.getStatementSeq());

                            String productName = "";

                            if(stocks == null || stocks.size() == 0) {
                                throw new NotFoundException(NotFoundException.STOCK_NOT_FOUND + "거래번호 : " + String.valueOf(statement.getStatementSeq()));
                            } else if(stocks.size() == 1) {
                                productName = stocks.get(0).getStockName();
                            } else {
                                productName = stocks.get(0).getStockName() + " 외 " + String.valueOf(stocks.size()-1) + "건";
                            }

                            String branchName = "";
                            int isReq = 0;
                            if(statement.getReqBranch() == myBranch) {
                                branchName = statement.getResBranch().getBranchName();
                                isReq = 1;
                            }

                            else if(statement.getResBranch() == myBranch) branchName = statement.getReqBranch().getBranchName();

                            return ScheduleResponseDto.builder()
                                    .statementSeq(statement.getStatementSeq())
                                    .branchName(branchName)
                                    .productName(productName)
                                    .statementStatus(statement.getStatementStatus().name())
                                    .tradeDate(statement.getTradeDate())
                                    .reqORres(isReq)
                                    .build();
                        }).collect(Collectors.toList())
                )
                .year(year)
                .month(month)
                .build();

        return ResultTemplate.builder().status(200).data(responseDto).build();
    }



    public ResultTemplate getBranchListOfCompany(Long companySeq, UserDetails worker) {

        companyRepository.findById(companySeq).orElseThrow(() ->
                new NotFoundException(NotFoundException.COMPANY_NOT_FOUND));

        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch mybranch = reqWorker.getBranch();

        List<BranchResponseDto> branchList = branchRepository.findByCompanySeq(companySeq)
                .stream()
                .filter(branch -> (!Objects.equals(branch.getBranchSeq(), mybranch.getBranchSeq())))
                .map(branch -> {
                    return BranchResponseDto.builder().branchName(branch.getBranchName())
                            .branchSeq(branch.getBranchSeq()).build();
                }).collect(Collectors.toList());

        BranchListResponseDto responseDto = BranchListResponseDto.builder()
                .branchList(branchList)
                .build();

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(responseDto).build();
    }

    public ResultTemplate<?> getBranchListOfMyCompany(UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Company myCompany = reqWorker.getCompany();

        List<BranchResponseDto> branchList = branchRepository.findByCompanySeq(myCompany.getCompanySeq())
                .stream()
                .map(branch -> {
                    return BranchResponseDto.builder().branchName(branch.getBranchName())
                            .branchSeq(branch.getBranchSeq()).build();
                }).collect(Collectors.toList());

        BranchListResponseDto responseDto = BranchListResponseDto.builder()
                .branchList(branchList)
                .build();

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(responseDto).build();
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

        Branch myBranch = worker.getBranch();

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .worker(AccessWorkerInfoResponseDto.builder().workerName(worker.getWorkerName()).loginId(worker.getLoginId()).role(worker.getRole().name()).build())
                .company(AccessCompanyInfoResponseDto.from(myCompany))
                .branch(AccessBranchInfoResponseDto.from(myBranch))
                .build();

        return ResultTemplate.builder().status(200).data(loginResponseDto).build();
    }

    @Transactional
    public ResultTemplate<?> loginByPass(PassAuthRequestDto request) {
        Pass myPass = passRepository.findByPassId(request.getPassId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.PASS_NOT_FOUND));

        Worker worker = myPass.getWorker();

        String accessToken = jwtService.createAccessToken(worker);
        String refreshToken = jwtService.createRefreshToken();

        worker.updateRefreshToken(refreshToken);
        workerRepository.save(worker);

        Company myCompany = worker.getCompany();

        Branch myBranch = worker.getBranch();

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .worker(AccessWorkerInfoResponseDto.builder().workerName(worker.getWorkerName()).loginId(worker.getLoginId()).role(worker.getRole().name()).build())
                .company(AccessCompanyInfoResponseDto.from(myCompany))
                .branch(AccessBranchInfoResponseDto.from(myBranch))
                .build();

        return ResultTemplate.builder().status(200).data(loginResponseDto).build();
    }

    @Transactional
    public ResultTemplate<?> passAuth(PassAuthRequestDto request, UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Pass myPass = passRepository.findByPassId(request.getPassId())
                .orElseThrow(() -> new NotFoundException(NotFoundException.PASS_NOT_FOUND));

        if(reqWorker.getWorkerSeq() != myPass.getWorker().getWorkerSeq()) {
            throw new MismatchException(MismatchException.PASS_IS_NOT_MINE+String.valueOf(reqWorker.getWorkerSeq())+"패스사람:"+String.valueOf(myPass.getWorker().getWorkerSeq()));
        }

        return ResultTemplate.builder().status(200).data("AUTHENTICATED").build();
    }


    @Transactional
    public ResultTemplate<?> addCompany(CompanyCreateDto request) {
        Company newCompany = Company.createCompany(request.getCompanyName(), request.getRegistrationNumber(), request.getCompanyLocation(), request.getCompanyContact());

        companyRepository.save(newCompany);
        return ResultTemplate.builder().status(200).data("success").build();
    }

}
