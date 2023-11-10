package com.ssafy.tou.controller;

import com.ssafy.tou.common.utils.ResultTemplate;
//import com.ssafy.tou.ledger.service.LedgerService;
import com.ssafy.tou.service.App;
import com.ssafy.tou.service.LedgerService;
import lombok.RequiredArgsConstructor;
import org.hyperledger.fabric.client.GatewayException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/ledger")
public class LedgerController {

    private final LedgerService ledgerService;
    private final App app;

    @PostMapping("/init")
    public ResultTemplate<?> initLedger() throws Exception {
        return ledgerService.init();
    }

    @GetMapping("/asset/{assetId}")
    public ResultTemplate getAssetById(@PathVariable String assetId) throws GatewayException {
        return app.readAssetById(assetId);
    }

}
