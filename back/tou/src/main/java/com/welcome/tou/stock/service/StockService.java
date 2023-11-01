package com.welcome.tou.stock.service;

import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.stock.domain.Stock;
import com.welcome.tou.stock.domain.StockRepository;
import com.welcome.tou.stock.dto.response.StockListResponseDto;
import com.welcome.tou.stock.dto.response.StockResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StockService {

    private final StockRepository stockRepository;

    public ResultTemplate getStockList(Long branchSeq){

        List<Stock> list = stockRepository.findStockByBranchAndInOutStatusAndUseStatus(branchSeq);

        StockListResponseDto response = StockListResponseDto.from(list.stream().map(stock -> {
           return StockResponseDto.from(stock);
        }).collect(Collectors.toList()));

        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }
}
