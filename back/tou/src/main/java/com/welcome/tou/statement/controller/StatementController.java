package com.welcome.tou.statement.controller;

import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.statement.dto.request.RefuseStatementRequestDto;
import com.welcome.tou.statement.dto.request.SignStatementRequestDto;
import com.welcome.tou.statement.dto.request.StatementCreateRequestDto;
import com.welcome.tou.statement.service.StatementService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/statement")
public class StatementController {

    private final StatementService statementService;

    @GetMapping("/worker/{branchSeq}/trade/count")
    public ResultTemplate getTradeCountList(@AuthenticationPrincipal UserDetails worker, @PathVariable Long branchSeq){
        return statementService.getTradeCountList(worker, branchSeq);
    }

    @GetMapping("/worker/detail/{statementSeq}")
    public ResultTemplate getStatementDetail(@AuthenticationPrincipal UserDetails worker, @PathVariable Long statementSeq){
        return statementService.getStatementDetail(worker, statementSeq);
    }


    @PostMapping("/worker")
    public ResultTemplate<?> addStatement(@RequestBody StatementCreateRequestDto request) {
        return statementService.addStatement(request);
    }




    @PostMapping("/worker/sign")
    public ResultTemplate<?> signStatement(@RequestBody SignStatementRequestDto request,
                                           @AuthenticationPrincipal UserDetails worker) {
        return statementService.signStatement(request, worker);
    }

    @PostMapping("/worker/refusal")
    public ResultTemplate<?> refuseStatement(@RequestBody RefuseStatementRequestDto request,
                                             @AuthenticationPrincipal UserDetails worker) {
        return statementService.refuseStatement(request, worker);
    }
 }
