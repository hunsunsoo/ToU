package com.welcome.tou.statement.controller;

import com.welcome.tou.common.utils.ResultTemplate;
import com.welcome.tou.statement.dto.request.StatementCreateRequestDto;
import com.welcome.tou.statement.service.StatementService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/statement")
public class StatementController {

    private final StatementService statementService;

    @PostMapping("/worker")
    public ResultTemplate<?> addStatement(@RequestBody StatementCreateRequestDto request) {
        return statementService.addStatement(request);
    }
}
