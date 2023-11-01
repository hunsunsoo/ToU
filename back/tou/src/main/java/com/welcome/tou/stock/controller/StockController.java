package com.welcome.tou.stock.controller;

import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.stock.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stock")
public class StockController {

    private final StockService stockService;

    @GetMapping("/officials/list/in/{branchSeq}")
    public ResultTemplate getStockList(@PathVariable Long branchSeq){
        return stockService.getStockList(branchSeq);
    }

}
