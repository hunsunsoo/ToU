package com.example.ledger.controller;

import com.example.common.utils.ResultTemplate;
import com.example.ledger.service.LedgerService;
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
