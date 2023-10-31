package com.welcome.tou.stock.controller;

import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.stock.dto.request.ProductCreateRequestDto;
import com.welcome.tou.stock.dto.request.StockCreateByProducerRequestDto;
import com.welcome.tou.stock.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stock")
public class StockController {

    private final StockService stockService;

    @PostMapping("/worker/product")
    public ResultTemplate<?> addProduct(@RequestBody ProductCreateRequestDto request,
                                        @AuthenticationPrincipal UserDetails worker) {
        return stockService.addProduct(request, worker);
    }

    @PostMapping("/producer")
    public ResultTemplate<?> addStockByProducer(@RequestBody StockCreateByProducerRequestDto request) {
        return stockService.addStockByProducer(request);
    }
}
