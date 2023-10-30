package com.welcome.tou.stock.service;

import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.stock.domain.ProductRepository;
import com.welcome.tou.stock.dto.request.ProductCreateRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StockService {

    private final ProductRepository productRepository;

    @Transactional
    public ResultTemplate<?> addProduct(ProductCreateRequestDto request) {
        // 작성
        return ResultTemplate.builder().status(200).data("success").build();
    }

}
