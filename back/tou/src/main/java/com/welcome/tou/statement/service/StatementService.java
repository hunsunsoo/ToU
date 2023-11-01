package com.welcome.tou.statement.service;

import com.welcome.tou.client.domain.Branch;
import com.welcome.tou.client.domain.BranchRepository;
import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.statement.domain.Item;
import com.welcome.tou.statement.domain.ItemRepository;
import com.welcome.tou.statement.domain.Statement;
import com.welcome.tou.statement.domain.StatementRepository;
import com.welcome.tou.statement.dto.request.StatementCreateRequestDto;
import com.welcome.tou.stock.domain.Stock;
import com.welcome.tou.stock.domain.StockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StatementService {

    private final StatementRepository statementRepository;
    private final ItemRepository itemRepository;
    private final BranchRepository branchRepository;
    private final StockRepository stockRepository;

    @Transactional
    public ResultTemplate<?> addStatement(StatementCreateRequestDto request) {
        Branch reqBranch = branchRepository.findById(request.getRequestBranch())
                .orElseThrow(() -> new NoSuchElementException("요청 업체를 찾을 수 없습니다."));

        Branch resBranch = branchRepository.findById(request.getResponseBranch())
                .orElseThrow(() -> new NoSuchElementException("상대 업체를 찾을 수 없습니다."));

        Statement newStatement = Statement.createStatement(reqBranch, resBranch, Statement.StatementStatus.PREPARING, request.getTradeDate());
        statementRepository.save(newStatement);

        for(int i=0; i<request.getItems().size(); i++){
            Stock stock = stockRepository.findById(request.getItems().get(i))
                    .orElseThrow(() -> new NoSuchElementException("재고를 찾을 수 없습니다."));
            Item newItem = Item.createItem(newStatement, stock);
            itemRepository.save(newItem);
        }

        // 거래명세서 생성과 함께 일정 추가 예정

        return ResultTemplate.builder().status(200).data("거래 신청 완료").build();
    }

}
