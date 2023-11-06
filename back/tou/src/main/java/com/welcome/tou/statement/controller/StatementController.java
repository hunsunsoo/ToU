package com.welcome.tou.statement.controller;

import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.statement.domain.Statement;
import com.welcome.tou.statement.dto.request.RefuseStatementRequestDto;
import com.welcome.tou.statement.dto.request.SignStatementRequestDto;
import com.welcome.tou.statement.dto.request.StatementCreateRequestDto;
import com.welcome.tou.statement.service.StatementService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.swing.plaf.nimbus.State;
import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @GetMapping("/worker/list/web/{branchSeq}")
    public ResultTemplate getStatementListByFilterAndPagination
            (@RequestParam int page, @PathVariable Long branchSeq,
             @RequestParam String type,
             @RequestParam(required = false) String companyName,
             @RequestParam(required = false) String myWorkerName,
             @RequestParam(required = false) String otherWorkerName,
             @RequestParam(required = false) Boolean isMine,
             @AuthenticationPrincipal UserDetails worker,
             @RequestParam(required = false) LocalDate startDate,
             @RequestParam(required = false) LocalDate endDate,
             @RequestParam(required = false) Statement.StatementStatus status,
            @RequestParam(required = false) String productName) {
        return statementService.getStatementListByFilterAndPagination(page, branchSeq, type, companyName,  myWorkerName,
                 otherWorkerName,  isMine,  worker,  startDate, endDate, status, productName );
    }

    @GetMapping("/worker/list/preparing")
    public ResultTemplate getStatementListPreparing(@AuthenticationPrincipal UserDetails worker) {
        return statementService.getStatementListPreparing(worker);
    }

    @PostMapping("/worker")
    public ResultTemplate<?> addStatement(@RequestBody StatementCreateRequestDto request,
                                          @AuthenticationPrincipal UserDetails worker) {
        return statementService.addStatement(request, worker);
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
