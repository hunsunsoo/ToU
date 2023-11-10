package com.welcome.tou.stock.service;


import com.welcome.tou.common.exception.InvalidStockException;
import com.welcome.tou.common.exception.MismatchException;
import com.welcome.tou.common.exception.NotFoundException;
import com.welcome.tou.stock.dto.request.StockCreateByOfficialsRequestDto;
import com.welcome.tou.stock.dto.response.*;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.welcome.tou.client.domain.Branch;
import com.welcome.tou.client.domain.BranchRepository;
import com.welcome.tou.client.domain.Worker;
import com.welcome.tou.client.domain.WorkerRepository;
import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.stock.domain.Product;
import com.welcome.tou.stock.domain.ProductRepository;
import com.welcome.tou.stock.domain.Stock;
import com.welcome.tou.stock.domain.StockRepository;
import com.welcome.tou.stock.dto.request.ProductCreateRequestDto;
import com.welcome.tou.stock.dto.request.StockCreateByProducerRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StockService {
    private final ProductRepository productRepository;
    private final WorkerRepository workerRepository;
    private final BranchRepository branchRepository;
    private final StockRepository stockRepository;


    public ResultTemplate getAllStockList(UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch myBranch = reqWorker.getBranch();

        List<Stock> list = stockRepository.findByBranchUnused(myBranch.getBranchSeq());

        StockListResponseDto responseDto = StockListResponseDto.from(list.stream().map(stock -> {
            String status = "";
            if(stock.getInOutStatus() == Stock.InOutStatus.IN) status = "입고";
            else if(stock.getInOutStatus() == Stock.InOutStatus.OUT) status = "출고";
            return StockResponseDto.from(stock, status);
        }).collect(Collectors.toList()));

        return ResultTemplate.builder().status(200).data(responseDto).build();
    }


    public ResultTemplate getStockList(UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch myBranch = reqWorker.getBranch();

        List<Stock> list = stockRepository.findStockByBranchAndInOutStatusAndUseStatus(myBranch.getBranchSeq(), Stock.InOutStatus.IN, Stock.UseStatus.UNUSED);

        StockListResponseDto response = StockListResponseDto.from(list.stream().map(stock -> {
            return StockResponseDto.from(stock, "입고");
        }).collect(Collectors.toList()));

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    public ResultTemplate getStockListForStatement(UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch myBranch = reqWorker.getBranch();

        List<Stock> stockList = stockRepository.findStockByBranchAndInOutStatusAndUseStatus(myBranch.getBranchSeq(), Stock.InOutStatus.OUT, Stock.UseStatus.UNUSED);

        if(stockList == null || stockList.size() == 0) {
            throw new NotFoundException("거래 가능한 재고가 존재하지 않습니다.");
        }

        StockListResponseDto responseDto = StockListResponseDto.from(stockList.stream().map(stock -> {
            return StockResponseDto.from(stock, "출고");
        }).collect(Collectors.toList()));

        return ResultTemplate.builder().status(200).data(responseDto).build();
    }

    public ResultTemplate getProductList(UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch myBranch = reqWorker.getBranch();

        List<Product> list = productRepository.findByBranch(myBranch.getBranchSeq());

        ProductListResponseDto response = ProductListResponseDto.builder().productList(list.stream().map(product -> {
            return ProductResponseDto.builder().productSeq(product.getProductSeq()).productName(product.getProductName()).build();
        }).collect(Collectors.toList())).build();

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    public ResultTemplate getDashStockList(Long branchSeq) {
        Branch branch = branchRepository.findById(branchSeq).orElseThrow(()->{
            throw new NotFoundException(NotFoundException.BRANCH_NOT_FOUND);
        });

        List<Stock> list = stockRepository.findByBranchLimit5(branchSeq);

        DashStockListResponseDto response = DashStockListResponseDto.builder().stockList(
                list.stream().map(stock -> {
                    return DashStockResponseDto.from(stock);
                }).collect(Collectors.toList())).build();

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    public ResultTemplate getStockPriceGraphList(Long branchSeq) {

        Branch branch = branchRepository.findById(branchSeq).orElseThrow(()->{
            throw new NotFoundException(NotFoundException.BRANCH_NOT_FOUND);
        });

        List<Stock> list = stockRepository.findDistinctByBranch(branchSeq);

        //1번째 스트림 : product가 들어있는 list 돌며 이름이 동일한 stock List찾기
        //2번째 스트림 : stockList 돌면서 priceList 만들기
        //만든 priceList와 productName을 조합하여 ResponseDto생성
        List<StockPriceListResponseDto> stockList = list.stream().map(st -> {
                    List<StockPriceResponseDto> priceList = stockRepository.findByStockName(st.getStockName()).stream().map(stock -> {
                        return StockPriceResponseDto.from(stock);
                    }).collect(Collectors.toList());
                    return StockPriceListResponseDto.builder().stockName(st.getStockName()).priceList(priceList).build();
                }).sorted(Comparator.comparingInt((StockPriceListResponseDto dto) -> dto.getPriceList().size()).reversed())
                .limit(4)
                .collect(Collectors.toList());

        StockPriceGraphListResponseDto response = StockPriceGraphListResponseDto.builder().stockList(stockList).build();

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(stockList).build();

    }


    @Transactional
    public ResultTemplate<?> addProduct(ProductCreateRequestDto request, UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch branch = branchRepository.findById(request.getBranchSeq())
                .orElseThrow(() -> new NotFoundException(NotFoundException.BRANCH_NOT_FOUND));

        Product newProduct = Product.createProduct(branch, request.getProductName(), request.getProductWeight());
        productRepository.save(newProduct);

        return ResultTemplate.builder().status(200).data("상품 추가 완료").build();
    }

    @Transactional
    public ResultTemplate<?> addStockByProducer(StockCreateByProducerRequestDto request, UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch branch = reqWorker.getBranch();

        System.out.println(request.getStockName());
        System.out.println(request.getStockPrice());
        System.out.println(request.getStockQuantity());

        if(branch.getCompany() != reqWorker.getCompany()) {
            throw new MismatchException(MismatchException.WORKER_AND_BRANCH_MISMATCH);
        }

        Stock newStock = Stock.createStock(
                branch,
                branch,
                request.getStockName(),
                branch.getChannelCode(),
                request.getStockQuantity(),
                request.getStockUnit(),
                LocalDateTime.now(),
                request.getStockPrice(),
                Stock.InOutStatus.OUT,
                Stock.UseStatus.UNUSED);

        stockRepository.save(newStock);

        return ResultTemplate.builder().status(200).data("재고 추가 완료").build();
    }

    @Transactional
    public ResultTemplate<?> addStockByOfiicials(StockCreateByOfficialsRequestDto request, UserDetails worker){
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));

        Branch branch = reqWorker.getBranch();

        if(branch.getCompany() != reqWorker.getCompany()) {
            throw new MismatchException(MismatchException.WORKER_AND_BRANCH_MISMATCH);
        }

        Stock beforeStock = stockRepository.findById(request.getBeforeStockSeq())
                .orElseThrow(() -> new NotFoundException(NotFoundException.STOCK_NOT_FOUND));

        if(branch != beforeStock.getBranch()){
            throw new MismatchException(MismatchException.STOCK_IS_NOT_IN_BRANCH);
        }
        if(beforeStock.getUseStatus() == Stock.UseStatus.USED) {
            throw new InvalidStockException(InvalidStockException.STOCK_USED_ALREADY);
        }
        if(beforeStock.getInOutStatus() == Stock.InOutStatus.OUT) {
            throw new InvalidStockException(InvalidStockException.STOCK_IS_NOT_NEED_PROCESS);
        }

        beforeStock.updateUseStatus(Stock.UseStatus.USED);
        stockRepository.save(beforeStock);

        Stock newStock = Stock.createStock(beforeStock.getBranch(),
                beforeStock.getFromBranch(),
                request.getNewStockName(),
                beforeStock.getStockCode(),
                request.getNewStockQuantity(),
                request.getNewStockUnit(),
                LocalDateTime.now(),
                request.getNewStockPrice(),
                Stock.InOutStatus.OUT,
                Stock.UseStatus.UNUSED);

        stockRepository.save(newStock);

        return ResultTemplate.builder().status(200).data("공정 처리가 완료되었습니다.").build();
    }
}
