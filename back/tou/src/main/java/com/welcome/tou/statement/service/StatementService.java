package com.welcome.tou.statement.service;

import com.welcome.tou.client.domain.Branch;
import com.welcome.tou.client.domain.BranchRepository;
import com.welcome.tou.client.domain.Worker;
import com.welcome.tou.client.domain.WorkerRepository;
import com.welcome.tou.common.exception.InvalidTradeException;
import com.welcome.tou.common.exception.MismatchException;
import com.welcome.tou.common.exception.NotFoundException;
import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.statement.domain.Item;
import com.welcome.tou.statement.domain.ItemRepository;
import com.welcome.tou.statement.domain.Statement;
import com.welcome.tou.statement.domain.StatementRepository;
import com.welcome.tou.statement.dto.request.RefuseStatementRequestDto;
import com.welcome.tou.statement.dto.request.SignStatementRequestDto;
import com.welcome.tou.statement.dto.request.StatementCreateRequestDto;
import com.welcome.tou.statement.dto.response.*;
import com.welcome.tou.stock.domain.Stock;
import com.welcome.tou.stock.domain.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StatementService {

    private final StatementRepository statementRepository;
    private final ItemRepository itemRepository;
    private final BranchRepository branchRepository;
    private final StockRepository stockRepository;
    private final WorkerRepository workerRepository;


    public ResultTemplate getTradeCountList(UserDetails worker, Long branchSeq) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NoSuchElementException("요청 유저를 찾을 수 없습니다."));

        Branch branch = branchRepository.findById(branchSeq).orElseThrow(() -> {
            throw new NotFoundException(NotFoundException.BRANCH_NOT_FOUND);
        });

        if(reqWorker.getCompany().getCompanySeq() != branch.getCompany().getCompanySeq()){
            throw new MismatchException(MismatchException.WORKER_AND_BRANCH_MISMATCH);
        }

        List<BranchTradeCountResponseDto> response;
        if (reqWorker.getRole().equals(Worker.Role.SELLER)) {
            response = statementRepository.findReqBranchTradeCountByResBranch(branchSeq);

        } else {

            response = statementRepository.findResBranchTradeCountByReqBranch(branchSeq);

        }

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();


    }

    public ResultTemplate getStatementDetail(UserDetails worker, Long statementSeq) {

        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker myWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Statement statement = statementRepository.findById(statementSeq).orElseThrow(() -> {
            throw new NotFoundException(NotFoundException.STATEMENT_NOT_FOUND);
        });

        Double totalPrice = 0.0;
        StatementReqInfoResponseDto reqInfo;
        StatementResInfoResponseDto resInfo;
        if (statement.getStatementStatus().equals(Statement.StatementStatus.WAITING)){
            reqInfo = null;
            resInfo = null;

        }else if(statement.getStatementStatus().equals(Statement.StatementStatus.PREPARING)) {
            reqInfo = StatementReqInfoResponseDto.from(statement);
            resInfo = null;
        }else {
            reqInfo = StatementReqInfoResponseDto.from(statement);
            resInfo = StatementResInfoResponseDto.from(statement);
        }

        if(!((reqInfo!=null && reqInfo.getCompanySeq() == myWorker.getCompany().getCompanySeq()) ||
           (resInfo!=null && resInfo.getCompanySeq() == myWorker.getCompany().getCompanySeq()))){
            throw new MismatchException(MismatchException.WORKER_AND_BRANCH_MISMATCH);
        }


        List<ItemResponseDto> itemList = statement.getItems().stream().map(item -> {
            return ItemResponseDto.from(item);
        }).collect(Collectors.toList());

        for (ItemResponseDto item : itemList) {
            totalPrice += item.getStockTotalPrice();
        }


        StatementDetailResponseDto responseDto = StatementDetailResponseDto.builder().reqInfo(reqInfo).resInfo(resInfo).
                statementSeq(statementSeq).itemList(itemList).totalPrice(totalPrice).tradeDate(statement.getTradeDate())
                .build();
        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(responseDto).build();
    }

    // 거래 최초 등록
    @Transactional
    public ResultTemplate<?> addStatement(StatementCreateRequestDto request) {
        Branch reqBranch = branchRepository.findById(request.getRequestBranch())
                .orElseThrow(() -> new NotFoundException(NotFoundException.BRANCH_NOT_FOUND));

        Branch resBranch = branchRepository.findById(request.getResponseBranch())
                .orElseThrow(() -> new NotFoundException("수급 관할 구역이" + NotFoundException.BRANCH_NOT_FOUND));

        if (reqBranch == resBranch) {
            throw new InvalidTradeException(InvalidTradeException.CANT_SAME_BRANCH);
        }

        Statement newStatement = Statement.createStatement(reqBranch, resBranch, Statement.StatementStatus.PREPARING, request.getTradeDate());
        statementRepository.save(newStatement);

        for (int i = 0; i < request.getItems().size(); i++) {
            Stock stock = stockRepository.findById(request.getItems().get(i))
                    .orElseThrow(() -> new NotFoundException(NotFoundException.STOCK_NOT_FOUND));
            Item newItem = Item.createItem(newStatement, stock);
            itemRepository.save(newItem);
        }

        // 거래명세서 생성과 함께 일정 추가 예정

        return ResultTemplate.builder().status(200).data("거래 신청 완료").build();
    }


    // 거래명세서 서명
    @Transactional
    public ResultTemplate<?> signStatement(SignStatementRequestDto request, UserDetails worker) {
        Statement statement = statementRepository.findById(request.getStatementSeq())
                .orElseThrow(() -> new NotFoundException(NotFoundException.STATEMENT_NOT_FOUND));

        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker myWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        if (request.getType().equals("SELL")) {
            if (!statement.getStatementStatus().name().equals("PREPARING")) {
                throw new InvalidTradeException(InvalidTradeException.NOT_SIGNING_PROCEDURE);
            }

            Branch myBranch = branchRepository.findById(statement.getReqBranch().getBranchSeq())
                    .orElseThrow(() -> new NotFoundException(NotFoundException.BRANCH_NOT_FOUND));

            if (myBranch.getCompany() != myWorker.getCompany()) {
                throw new MismatchException(MismatchException.WORKER_AND_BRANCH_MISMATCH);
            }

            statement.updateStatementSignFromReq(myWorker);
            statementRepository.save(statement);

        } else if (request.getType().equals("BUY")) {
            if (!statement.getStatementStatus().name().equals("WAITING")) {
                throw new InvalidTradeException(InvalidTradeException.NOT_SIGNING_PROCEDURE);
            }

            Branch myBranch = branchRepository.findById(statement.getResBranch().getBranchSeq())
                    .orElseThrow(() -> new NotFoundException(NotFoundException.BRANCH_NOT_FOUND));

            if (myBranch.getCompany() != myWorker.getCompany()) {
                throw new MismatchException(MismatchException.WORKER_AND_BRANCH_MISMATCH);
            }

            statement.updateStatementSignFromRes(myWorker);
            statementRepository.save(statement);

            adjustStockBaseOnStatement(statement);
        }

        return ResultTemplate.builder().status(200).data("서명이 완료되었습니다.").build();

    }

    public ResultTemplate<?> refuseStatement(RefuseStatementRequestDto request, UserDetails worker) {
        Statement statement = statementRepository.findById(request.getStatementSeq())
                .orElseThrow(() -> new NotFoundException(NotFoundException.STATEMENT_NOT_FOUND));

        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker myWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch myBranch = branchRepository.findById(statement.getResBranch().getBranchSeq())
                .orElseThrow(() -> new NotFoundException(NotFoundException.BRANCH_NOT_FOUND));

        if (myBranch.getCompany() != myWorker.getCompany()) {
            throw new MismatchException(MismatchException.WORKER_AND_BRANCH_MISMATCH);
        }

        if (statement.getStatementStatus() != Statement.StatementStatus.WAITING) {
            throw new InvalidTradeException(InvalidTradeException.NOT_REFUSING_PROCEDURE);
        }

        statement.updateStatementStatus(Statement.StatementStatus.REFUSAL);
        statementRepository.save(statement);

        return ResultTemplate.builder().status(200).data("해당 거래를 거절하였습니다.").build();
    }


    public void adjustStockBaseOnStatement(Statement statement) {
        Long statementSeq = statement.getStatementSeq();
        List<Stock> stocks = itemRepository.findStockByStatementSeq(statementSeq);

        Branch branch = statement.getResBranch();
        Branch fromBranch = statement.getReqBranch();

        for (Stock st : stocks) {
            if (!(st.getInOutStatus() == Stock.InOutStatus.OUT) || !(st.getUseStatus() == Stock.UseStatus.UNUSED)) {
                throw new InvalidTradeException(InvalidTradeException.INVALID_STOCK_FOR_TRADE);
            }

            st.updateUseStatus(Stock.UseStatus.USED);
            stockRepository.save(st);

            Stock newStock = Stock.createStock(
                    branch,
                    fromBranch,
                    st.getStockName(),
                    st.getStockCode() + branch.getChannelCode(),
                    st.getStockQuantity(),
                    st.getStockUnit(),
                    statement.getResDate(),
                    st.getStockPrice(),
                    Stock.InOutStatus.IN,
                    Stock.UseStatus.UNUSED);

            stockRepository.save(newStock);
        }
    }

}
