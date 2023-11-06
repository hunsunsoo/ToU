package com.example.ledger.service;

import com.example.common.utils.ResultTemplate;
import com.example.original.EnrollAdmin;
import com.example.original.RegisterUser;
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
            System.out.println("gateway.getNework 시작");
            Network network = gateway.getNetwork("mychannel");
            System.out.println("network Name : \n" + network.getChannel().getName());
            System.out.println("network.getContract(\"basic\"); 시작");
            Contract contract = null;
            try {
                 contract = network.getContract("basic");

            } catch (Exception e){
                System.out.println(e.getMessage());
            }
            byte[] result;
            System.out.println(" contract.submitTransaction(\"InitLedger\"); 시작");
            contract.submitTransaction("InitLedger");

            System.out.println(" result = contract.evaluateTransaction(\"GetAllAssets\"); 시작");

            result = contract.evaluateTransaction("GetAllAssets");


            response = new String(result);
            System.out.println("Evaluate Transaction: GetAllAssets, result: " + response);
        } catch (Exception e) {
            System.err.println(e);
            System.out.println(e.getMessage());
        }
        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(response).build();
    }

    private Gateway connect() throws IOException {
        System.out.println("Gateway connect() start");
        // Load a file system based wallet for managing identities.
        Path walletPath = Paths.get("wallet");
        Wallet wallet = null;
        wallet = Wallets.newFileSystemWallet(walletPath);


        System.out.println("Finish \"Load a file system based wallet for managing identities\"");

        // load a CCP
        Path networkConfigPath = Paths.get("..", "..", "test-network", "organizations", "peerOrganizations", "org1.example.com", "connection-org1.yaml");

        Gateway.Builder builder = Gateway.createBuilder();
        System.out.println("Finish \"Gateway.createBuilder()\"");

        builder.identity(wallet, "appUser").networkConfig(networkConfigPath).discovery(true);

        return builder.connect();
    }
}
