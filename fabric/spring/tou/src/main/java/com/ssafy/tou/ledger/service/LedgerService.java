package com.ssafy.tou.ledger.service;

import com.ssafy.tou.common.utils.ResultTemplate;
import com.ssafy.tou.example.EnrollAdmin;
import com.ssafy.tou.example.RegisterUser;
import lombok.RequiredArgsConstructor;
import org.hyperledger.fabric.gateway.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class LedgerService {

    public ResultTemplate<?> initLedger() {
        try {
            EnrollAdmin.main(null);
            RegisterUser.main(null);
        } catch (Exception e) {
            System.err.println(e);
        }

        String response = null;
        try (Gateway gateway = connect()) {
            // get the network and contract
            Network network = gateway.getNetwork("mychannel");
            Contract contract = network.getContract("basic");

            byte[] result;
            contract.submitTransaction("InitLedger");
            result = contract.evaluateTransaction("GetAllAssets");
            response = new String(result);
            System.out.println("Evaluate Transaction: GetAllAssets, result: " + response);
        } catch (Exception e) {
            System.err.println(e);
        }
        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    private Gateway connect() throws IOException {
        // Load a file system based wallet for managing identities.
        Path walletPath = Paths.get("wallet");
        Wallet wallet = null;
        wallet = Wallets.newFileSystemWallet(walletPath);
        // load a CCP
        Path networkConfigPath = Paths.get("..", "..", "test-network", "organizations", "peerOrganizations", "org1.example.com", "connection-org1.yaml");

        Gateway.Builder builder = Gateway.createBuilder();
        builder.identity(wallet, "appUser").networkConfig(networkConfigPath).discovery(true);
        return builder.connect();
    }
}
