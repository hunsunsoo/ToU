package com.welcome.tou.stock.controller;

import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.stock.dto.request.ProductCreateRequestDto;
import com.welcome.tou.stock.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
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
    public ResultTemplate<?> addProduct(@RequestBody ProductCreateRequestDto request) {
        return stockService.addProduct(request);
    }
}
