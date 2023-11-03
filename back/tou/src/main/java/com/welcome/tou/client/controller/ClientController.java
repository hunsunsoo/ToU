package com.welcome.tou.client.controller;

import com.welcome.tou.client.dto.request.CompanyCreateDto;
import com.welcome.tou.client.dto.request.LoginRequestDto;
import com.welcome.tou.client.service.ClientService;
import com.welcome.tou.common.utils.ResultTemplate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/client")
public class ClientController {

    private final ClientService clientService;

    @GetMapping("/worker/branch/list/{companySeq}")
    public ResultTemplate getBranchListByCompany(@PathVariable Long companySeq){
        return clientService.getBranchListOfCompany(companySeq);
    }

    @PostMapping("/login")
    public ResultTemplate login(@RequestBody LoginRequestDto request) {
        return clientService.login(request);
    }

    @PostMapping("/company")
    public ResultTemplate addCompany(@RequestBody CompanyCreateDto request) {
        return clientService.addCompany(request);
    }

}
