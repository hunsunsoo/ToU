package com.welcome.tou.client.controller;

import com.welcome.tou.client.dto.request.CompanyCreateDto;
import com.welcome.tou.client.service.ClientService;
import com.welcome.tou.common.utils.ResultTemplate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/client")
public class ClientController {

    private final ClientService clientService;

    @PostMapping("/company")
    public ResultTemplate addCompany(@RequestBody CompanyCreateDto request){
        return clientService.addCompany(request);
    }

}