package com.ssafy.tou.ledger.controller;

import com.ssafy.tou.common.utils.ResultTemplate;
import com.ssafy.tou.ledger.service.LedgerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/ledger")
public class LedgerController {

    private final LedgerService ledgerService;

    @PostMapping("/init")
    public ResultTemplate<?> initLedger(){
        return ledgerService.initLedger();
    }
}
