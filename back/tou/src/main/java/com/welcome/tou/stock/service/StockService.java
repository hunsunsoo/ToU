package com.welcome.tou.stock.service;


import com.welcome.tou.common.exception.NotFoundException;
import com.welcome.tou.stock.dto.response.*;
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
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StockService {
    private final ProductRepository productRepository;
    private final WorkerRepository workerRepository;
    private final BranchRepository branchRepository;
    private final StockRepository stockRepository;


    public ResultTemplate getStockList(Long branchSeq) {

        Branch branch = branchRepository.findById(branchSeq).orElseThrow(()->{
            throw new NotFoundException(NotFoundException.BRANCH_NOT_FOUND);
        });
        List<Stock> list = stockRepository.findStockByBranchAndInOutStatusAndUseStatus(branchSeq);

        StockListResponseDto response = StockListResponseDto.from(list.stream().map(stock -> {
            return StockResponseDto.from(stock);
        }).collect(Collectors.toList()));

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    public ResultTemplate getProductList(Long branchSeq) {
        Branch branch = branchRepository.findById(branchSeq).orElseThrow(()->{
            throw new NotFoundException(NotFoundException.BRANCH_NOT_FOUND);
        });
        List<Product> list = productRepository.findByBranch(branchSeq);

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
                .orElseThrow(() -> new NoSuchElementException("요청 유저를 찾을 수 없습니다."));

        Branch branch = branchRepository.findById(request.getBranchSeq())
                .orElseThrow(() -> new NoSuchElementException("요청 업체를 찾을 수 없습니다."));

        Product newProduct = Product.createProduct(branch, request.getProductName(), request.getProductWeight());
        productRepository.save(newProduct);

        return ResultTemplate.builder().status(200).data("상품 추가 완료").build();
    }

    @Transactional
    public ResultTemplate<?> addStockByProducer(StockCreateByProducerRequestDto request) {

        Branch branch = branchRepository.findById(request.getBranchSeq())
                .orElseThrow(() -> new NoSuchElementException("요청 업체를 찾을 수 없습니다."));

        Stock newStock = Stock.createStock(
                branch,
                request.getStockName(),
                branch.getChannelCode(),
                request.getStockQuantity(),
                request.getStockUnit(),
                LocalDateTime.now(),
                request.getStockPrice(),
                Stock.InOutStatus.OUT,
                Stock.UseStatus.USED);

        stockRepository.save(newStock);

        return ResultTemplate.builder().status(200).data("재고 추가 완료").build();
    }

}
