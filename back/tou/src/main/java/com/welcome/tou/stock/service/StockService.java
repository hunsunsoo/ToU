package com.welcome.tou.stock.service;

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
