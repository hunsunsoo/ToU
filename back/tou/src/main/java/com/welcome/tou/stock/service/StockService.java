package com.welcome.tou.stock.service;

import com.welcome.tou.client.domain.Company;
import com.welcome.tou.client.domain.CompanyRepository;
import com.welcome.tou.client.domain.Worker;
import com.welcome.tou.client.domain.WorkerRepository;
import com.welcome.tou.common.exception.NotFoundException;
import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.stock.domain.Product;
import com.welcome.tou.stock.domain.ProductRepository;
import com.welcome.tou.stock.dto.request.ProductCreateRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StockService {

    private final ProductRepository productRepository;
    private final WorkerRepository workerRepository;

    @Transactional
    public ResultTemplate<?> addProduct(ProductCreateRequestDto request, UserDetails worker) {
        Long workerSeq = Long.parseLong(worker.getUsername());
        Worker reqWorker = workerRepository.findById(workerSeq)
                .orElseThrow(() -> new NotFoundException(NotFoundException.WORKER_NOT_FOUND));


        Product newProduct = Product.createProduct(reqWorker.getCompany(), request.getProductName(), Double.valueOf(request.getProductWeight()));
        productRepository.save(newProduct);

        return ResultTemplate.builder().status(200).data("success").build();
    }

}
