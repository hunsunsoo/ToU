package com.welcome.tou.stock.controller;

import com.welcome.tou.common.utils.ResultTemplate;


import com.welcome.tou.stock.dto.request.StockCreateByOfficialsRequestDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/officials/list/in")
    public ResultTemplate getStockList(@AuthenticationPrincipal UserDetails worker){
        return stockService.getStockList(worker);
    }

    @GetMapping("/worker/list/out")
    public ResultTemplate getStockListForStatement(@AuthenticationPrincipal UserDetails worker) {
        return stockService.getStockListForStatement(worker);
    }

    @GetMapping("/worker/product/list/{branchSeq}")
    public ResultTemplate getProductList(@PathVariable Long branchSeq){
        return stockService.getProductList(branchSeq);
    }

    @GetMapping("/worker/dash/list/{branchSeq}")
    public ResultTemplate getDashStockList(@PathVariable Long branchSeq){
        return stockService.getDashStockList(branchSeq);
    }

    @GetMapping("/worker/{branchSeq}/receiving/price")
    public ResultTemplate getDashGraphStockList(@PathVariable Long branchSeq){
        return stockService.getStockPriceGraphList(branchSeq);
    }

    @PostMapping("/worker/product")
    public ResultTemplate<?> addProduct(@RequestBody ProductCreateRequestDto request,
                                        @AuthenticationPrincipal UserDetails worker) {
        return stockService.addProduct(request, worker);
    }

    @PostMapping("/producer")
    public ResultTemplate<?> addStockByProducer(@RequestBody StockCreateByProducerRequestDto request,
                                                @AuthenticationPrincipal UserDetails worker) {
        return stockService.addStockByProducer(request, worker);
    }

    @PostMapping("/officials")
    public ResultTemplate<?> addStockByOfficials(@RequestBody StockCreateByOfficialsRequestDto request,
                                                 @AuthenticationPrincipal UserDetails worker) {
        return  stockService.addStockByOfiicials(request, worker);
    }



}
