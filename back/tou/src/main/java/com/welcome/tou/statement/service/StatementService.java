package com.welcome.tou.statement.service;

import com.welcome.tou.client.domain.*;
import com.welcome.tou.common.exception.BadRequestException;
import com.welcome.tou.common.exception.InvalidTradeException;
import com.welcome.tou.common.exception.MismatchException;
import com.welcome.tou.common.exception.NotFoundException;
import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.statement.domain.*;
import com.welcome.tou.statement.dto.request.RefuseStatementRequestDto;
import com.welcome.tou.statement.dto.request.SignStatementRequestDto;
import com.welcome.tou.statement.dto.request.StatementCreateRequestDto;
import com.welcome.tou.statement.dto.response.*;
import com.welcome.tou.stock.domain.Stock;
import com.welcome.tou.stock.domain.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
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
    private final StatementQueryRepository statementQueryRepository;


    public ResultTemplate getTradeCountList(UserDetails worker, Long branchSeq) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NoSuchElementException("요청 유저를 찾을 수 없습니다."));

        Branch branch = branchRepository.findById(branchSeq).orElseThrow(() -> {
            throw new NotFoundException(NotFoundException.BRANCH_NOT_FOUND);
        });

        if (reqWorker.getCompany().getCompanySeq() != branch.getCompany().getCompanySeq()) {
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
        if (statement.getStatementStatus().equals(Statement.StatementStatus.PREPARING)) {
            reqInfo = StatementReqInfoResponseDto.from(statement, null);
            resInfo = StatementResInfoResponseDto.from(statement, null);
        } else if (statement.getStatementStatus().equals(Statement.StatementStatus.WAITING)) {
            reqInfo = StatementReqInfoResponseDto.from(statement, statement.getReqWorker().getWorkerName());
            resInfo = StatementResInfoResponseDto.from(statement, null);
        } else {
            reqInfo = StatementReqInfoResponseDto.from(statement, statement.getReqWorker().getWorkerName());
            resInfo = StatementResInfoResponseDto.from(statement, statement.getResWorker().getWorkerName());
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

    public ResultTemplate getStatementListByFilterAndPagination(int page, String type, String companyName, String myWorkerName,
                                                                String otherWorkerName, Boolean isMine, UserDetails worker, LocalDate startDate, LocalDate endDate,
                                                                Statement.StatementStatus status, String productName) {


        log.info("endDate :{}",endDate);

        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch reqBranch = reqWorker.getBranch();

        if (page < 1) throw new BadRequestException(BadRequestException.BAD_PAGE_REQUEST);
        if (isMine && myWorkerName != null) throw new BadRequestException(BadRequestException.BAD_VARIABLE_REQUEST);


        //페이지네이션 page 수 , size, 정렬
        PageRequest pageable = PageRequest.of(page - 1, 2,
                Sort.by("statementSeq").ascending());

        //필터링 + pagenation
        Page<Statement> list = statementQueryRepository.findWithFilteringAndPagination(pageable, reqBranch.getBranchSeq(), type, companyName,
                myWorkerName, otherWorkerName, isMine, workerSeq, startDate, endDate, status, productName);

        // 1. 현재 페이지 번호를 계산합니다.
        int currentPage = list.getNumber() + 1;
        int maxPagesToShow = 3; // 한 번에 표시할 페이지 수

// startPage는 현재 페이지 번호를 maxPagesToShow로 나눈 몫에 1을 더한 값에 maxPagesToShow를 곱하고 maxPagesToShow - 2를 더한 값입니다.
        int startPage = (int) Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;

// endPage는 startPage에서 maxPagesToShow만큼 더한 후 -1을 합니다.
        int endPage = startPage + maxPagesToShow - 1;

// 만약 endPage가 전체 페이지 수보다 큰 경우에는 전체 페이지 수를 endPage로 설정합니다.
        if (endPage > list.getTotalPages()) {
            endPage = list.getTotalPages();
        }
        int pre;
        int prevPageGroupEnd = startPage - 1; // 이전 페이지 그룹의 마지막 페이지
        if (prevPageGroupEnd >= 1) {
            pre = prevPageGroupEnd;
        } else {
            pre = 1;
        }

// next 페이지 번호
        int next;
        int nextPageGroupStart = startPage + maxPagesToShow; // 다음 페이지 그룹의 시작 페이지
        if (list.getTotalPages() > nextPageGroupStart) {
            next = nextPageGroupStart;
        } else {
            next = endPage;
        }
        int start = (currentPage - 1) * list.getSize() + 1; // 시작 글 번호


        if(page> list.getTotalPages())
            throw new BadRequestException(BadRequestException.OVER_PAGE_REQUEST);
        List<WebStatementResponseDto> statementList = list.getContent()
                .stream()
                .map(statement -> {
                    AtomicReference<Double> price = new AtomicReference<>(0.0);

                    statement.getItems().forEach(item -> {
                        double itemTotalPrice = item.getStock().getStockPrice() * item.getStock().getStockQuantity();
                        price.updateAndGet(v -> v + itemTotalPrice);
                    });
                    return WebStatementResponseDto.from(statement, type,
                            new DecimalFormat("#,###.00").format(price.get()));
                })
                .collect(Collectors.toList());

        WebStatementPageableResponseDto response = WebStatementPageableResponseDto.builder()
                .statementList(statementList)
                .totalElements(list.getTotalElements())
                .totalPages(list.getTotalPages())
                .currentPage(list.getNumber() + 1) // 페이지 인덱스는 0부터 시작하므로 1을 더합니다.
                .size(list.getSize())
                .first(list.isFirst()) // 첫 페이지인지 확인
                .last(list.isLast()) // 마지막 페이지인지 확인
                .hasNext(list.hasNext()) // 다음 페이지가 있는지 확인
                .hasPrevious(list.hasPrevious()) // 이전 페이지가 있는지 확인
                .startPage(startPage)  // 추가: 표시될 시작 페이지 번호 설정
                .endPage(endPage)      // 추가: 표시될 끝 페이지 번호 설정
                .pre(pre)
                .next(next)
                .start(start)
                .build();

        return ResultTemplate.builder()
                .status(HttpStatus.OK.value())
                .data(response)
                .build();

    }


    public ResultTemplate getStatementListForApp(UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch myBranch = reqWorker.getBranch();

        List<Statement> myStatement = statementRepository.findAllStatementsByBranchSeq(myBranch.getBranchSeq());

        if(myStatement == null || myStatement.size() == 0) {
            throw new NotFoundException(NotFoundException.STATEMENT_NOT_FOUND);
        }

        AppStatementListResponseDto responseDto = AppStatementListResponseDto.builder()
                .StatementList(
                        myStatement.stream().map(statement -> {
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

                            Long branchSeq = 0L;
                            int isReq = 0;
                            if(statement.getReqBranch() == myBranch) {
                                branchName = statement.getResBranch().getBranchName();
                                branchSeq = statement.getResBranch().getBranchSeq();
                                isReq = 1;
                            }
                            else if(statement.getResBranch() == myBranch) {
                                branchName = statement.getReqBranch().getBranchName();
                                branchSeq = statement.getReqBranch().getBranchSeq();
                            }

                            return AppStatementResponseDto.builder()
                                    .statementSeq(statement.getStatementSeq())
                                    .branchSeq(branchSeq)
                                    .branchName(branchName)
                                    .productName(productName)
                                    .tradeDate(statement.getTradeDate())
                                    .statementStatus(statement.getStatementStatus().name())
                                    .reqORres(isReq)
                                    .build();
                        }).collect(Collectors.toList())
                ).build();

        return ResultTemplate.builder().status(200).data(responseDto).build();
    }


    public ResultTemplate<?> getStatementListPreparing(UserDetails worker) {
        // 유저 정보 가져오고
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker myWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch myBranch = myWorker.getBranch();

        /**
         * 실무자와 지점을 연결하면서 서명할 수 있는 거래명세서의 범위 좁힘
        Long companySeq = myWorker.getCompany().getCompanySeq();

        List<Branch> branchList = null;
        String myRole = myWorker.getRole().name();

        switch (myRole){
            case "PRODUCER":
                branchList = branchRepository.findByCompanySeqAndRole(companySeq, Collections.singletonList(Branch.BranchType.PRODUCT));
                break;
            case "OFFICIALS":
                branchList = branchRepository.findByCompanySeqAndRole(companySeq, Arrays.asList(Branch.BranchType.PROCESS, Branch.BranchType.PACKAGING));
                break;
            case "SELLER":
                branchList = branchRepository.findByCompanySeqAndRole(companySeq, Collections.singletonList(Branch.BranchType.SELL));
                break;
        }

        if (branchList == null || branchList.size() == 0){
            throw new NotFoundException(NotFoundException.BRANCH_NOT_FOUND);
        }

        List<Long> branchSeqList = branchList.stream()
                .map(Branch::getBranchSeq)
                .collect(Collectors.toList());
         */

        List<Statement> myStatement = statementRepository.findStatementsByBranchSeqAndPreparing(myBranch.getBranchSeq());
        if(myStatement == null || myStatement.size() == 0) {
            throw new NotFoundException(NotFoundException.STOCK_FOR_SIGN_NOT_FOUND);
        }

        StatementPreparingResponseDto responseDto = StatementPreparingResponseDto.builder()
                .statementList(
                        myStatement.stream().map(statement -> {

                            List<Stock> stocks = itemRepository.findStockByStatementSeq(statement.getStatementSeq());

                            String productsName = "";

                            if(stocks == null || stocks.size() == 0) {
                                throw new NotFoundException(NotFoundException.STOCK_NOT_FOUND);
                            } else if(stocks.size() == 1) {
                                productsName = stocks.get(0).getStockName();
                            } else {
                                productsName = stocks.get(0).getStockName() + " 외 " + String.valueOf(stocks.size()-1) + "건";
                            }

                            return PreparingListResponseDto.builder()
                                    .statementSeq(statement.getStatementSeq())
                                    .branchName(statement.getResBranch().getBranchName())
                                    .productsName(productsName)
                                    .tradeDate(statement.getTradeDate())
                                    .build();

                        }).collect(Collectors.toList())
                )
                .hasNext(false)
                .build();

        return ResultTemplate.builder().status(200).data(responseDto).build();
    }

    public ResultTemplate<?> getStatementListWaiting(UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker myWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch myBranch = myWorker.getBranch();

        List<Statement> myStatement = statementRepository.findStatementsByBranchSeqAndWaiting(myBranch.getBranchSeq());
        if(myStatement == null || myStatement.size() == 0) {
            throw new NotFoundException(NotFoundException.STOCK_FOR_SIGN_NOT_FOUND);
        }

        StatementPreparingResponseDto responseDto = StatementPreparingResponseDto.builder()
                .statementList(
                        myStatement.stream().map(statement -> {

                            List<Stock> stocks = itemRepository.findStockByStatementSeq(statement.getStatementSeq());

                            String productsName = "";

                            if(stocks == null || stocks.size() == 0) {
                                throw new NotFoundException(NotFoundException.STOCK_NOT_FOUND);
                            } else if(stocks.size() == 1) {
                                productsName = stocks.get(0).getStockName();
                            } else {
                                productsName = stocks.get(0).getStockName() + " 외 " + String.valueOf(stocks.size()-1) + "건";
                            }

                            return PreparingListResponseDto.builder()
                                    .statementSeq(statement.getStatementSeq())
                                    .branchName(statement.getReqBranch().getBranchName())
                                    .productsName(productsName)
                                    .tradeDate(statement.getTradeDate())
                                    .build();

                        }).collect(Collectors.toList())
                )
                .hasNext(false)
                .build();

        return ResultTemplate.builder().status(200).data(responseDto).build();
    }

    public ResultTemplate<?> getStatementMyCompanyOnCompletion(UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker myWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch MyBranch = myWorker.getBranch();
        Company MyCompany = myWorker.getCompany();

        List<Branch> ourBranchList = branchRepository.findByCompanySeq(MyCompany.getCompanySeq());
        List<Long> outBranchSeqs = ourBranchList.stream().map(branch -> {
            return branch.getBranchSeq();
        }).collect(Collectors.toList());
        List<Statement> statementList = statementRepository.findAllStatementsByBranchListAndCompletion(outBranchSeqs);

        StatementOurCompanyOnCompletionDto responseDto = StatementOurCompanyOnCompletionDto.builder()
                .companyName(MyCompany.getCompanyName())
                .statementList(
                        statementList.stream().map(statement -> {

                            List<Stock> stocks = itemRepository.findStockByStatementSeq(statement.getStatementSeq());

                            String productsName = "";

                            if(stocks == null || stocks.size() == 0) {
                                throw new NotFoundException(NotFoundException.STOCK_NOT_FOUND);
                            } else if(stocks.size() == 1) {
                                productsName = stocks.get(0).getStockName();
                            } else {
                                productsName = stocks.get(0).getStockName() + " 외 " + String.valueOf(stocks.size()-1) + "건";
                            }

                            return StatementOnCompletionDto.builder()
                                    .statementSeq(statement.getStatementSeq())
                                    .reqBranchSeq(statement.getReqBranch().getBranchSeq())
                                    .reqBranchName(statement.getReqBranch().getBranchName())
                                    .resBranchSeq(statement.getResBranch().getBranchSeq())
                                    .resBranchName(statement.getResBranch().getBranchName())
                                    .productName(productsName)
                                    .tradeDate(statement.getTradeDate())
                                    .build();
                        }).collect(Collectors.toList())
                )
                .build();

        return ResultTemplate.builder().status(200).data(responseDto).build();
    }


    // 거래 최초 등록
    @Transactional
    public ResultTemplate<?> addStatement(StatementCreateRequestDto request, UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker myWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch reqBranch = myWorker.getBranch();

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

        AddStatementResponseDto responseDto = AddStatementResponseDto.builder()
                .message("거래 신청 완료")
                .statementSeq(newStatement.getStatementSeq())
                .build();

        return ResultTemplate.builder().status(200).data(responseDto).build();
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

    @Transactional
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
