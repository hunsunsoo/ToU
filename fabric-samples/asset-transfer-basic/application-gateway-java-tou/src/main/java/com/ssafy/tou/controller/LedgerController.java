package com.ssafy.tou.controller;

import com.ssafy.tou.common.utils.ResultTemplate;
import com.ssafy.tou.domain.requestDto.StockRequestDto;
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
    public ResultTemplate getAssetById(@PathVariable String assetId) {
        return app.readAssetById(assetId);
    }

    @GetMapping("/asset/all")
    public ResultTemplate getAllAssets(){
        return app.getAllAssets();

    }
    @PostMapping("/asset")
    public ResultTemplate createAsset(@RequestBody StockRequestDto request) {
        return app.createAsset(request);
    }

    @DeleteMapping("/asset/{assetId}")
    public ResultTemplate deleteAssetById(@PathVariable String assetId) {
        return app.deleteAssetById(assetId);
    }

}
