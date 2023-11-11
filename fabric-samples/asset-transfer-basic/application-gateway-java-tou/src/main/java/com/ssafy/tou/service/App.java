package com.ssafy.tou.service;/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParser;
import com.ssafy.tou.common.utils.ResultTemplate;
import com.ssafy.tou.domain.requestDto.StockRequestDto;
import com.ssafy.tou.domain.requestDto.UpdateInfoRequestDto;
import io.grpc.ManagedChannel;
import io.grpc.netty.shaded.io.grpc.netty.GrpcSslContexts;
import io.grpc.netty.shaded.io.grpc.netty.NettyChannelBuilder;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hyperledger.fabric.client.CommitException;
import org.hyperledger.fabric.client.CommitStatusException;
import org.hyperledger.fabric.client.Contract;
import org.hyperledger.fabric.client.EndorseException;
import org.hyperledger.fabric.client.Gateway;
import org.hyperledger.fabric.client.GatewayException;
import org.hyperledger.fabric.client.SubmitException;
import org.hyperledger.fabric.client.identity.Identities;
import org.hyperledger.fabric.client.identity.Identity;
import org.hyperledger.fabric.client.identity.Signer;
import org.hyperledger.fabric.client.identity.Signers;
import org.hyperledger.fabric.client.identity.X509Identity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.InvalidKeyException;
import java.security.cert.CertificateException;
import java.time.Instant;
import java.util.concurrent.TimeUnit;


@Service
@Slf4j
public class App {
    private static final String MSP_ID = System.getenv().getOrDefault("MSP_ID", "Org1MSP");
    private static final String CHANNEL_NAME = System.getenv().getOrDefault("CHANNEL_NAME", "mychannel");
    private static final String CHAINCODE_NAME = System.getenv().getOrDefault("CHAINCODE_NAME", "basic");

    // Path to crypto materials.
    private static final Path CRYPTO_PATH = Paths.get("../../test-network/organizations/peerOrganizations/org1.example.com");
    // Path to user certificate.
    private static final Path CERT_PATH = CRYPTO_PATH.resolve(Paths.get("users/User1@org1.example.com/msp/signcerts/cert.pem"));
    // Path to user private key directory.
    private static final Path KEY_DIR_PATH = CRYPTO_PATH.resolve(Paths.get("users/User1@org1.example.com/msp/keystore"));
    // Path to peer tls certificate.
    private static final Path TLS_CERT_PATH = CRYPTO_PATH.resolve(Paths.get("peers/peer0.org1.example.com/tls/ca.crt"));

    // Gateway peer end point.
    private static final String PEER_ENDPOINT = "localhost:7051";
    private static final String OVERRIDE_AUTH = "peer0.org1.example.com";

    private final Contract contract;
    private final String assetId = "asset" + Instant.now().toEpochMilli();
    private final Gson gson = new GsonBuilder().setPrettyPrinting().create();

//    public static void main(final String[] args) throws Exception {
//        // The gRPC client connection should be shared by all Gateway connections to
//        // this endpoint.
//        var channel = newGrpcConnection();
//
//        var builder = Gateway.newInstance().identity(newIdentity()).signer(newSigner()).connection(channel)
//                // Default timeouts for different gRPC calls
//                .evaluateOptions(options -> options.withDeadlineAfter(5, TimeUnit.SECONDS))
//                .endorseOptions(options -> options.withDeadlineAfter(15, TimeUnit.SECONDS))
//                .submitOptions(options -> options.withDeadlineAfter(5, TimeUnit.SECONDS))
//                .commitStatusOptions(options -> options.withDeadlineAfter(1, TimeUnit.MINUTES));
//
//        try (var gateway = builder.connect()) {
//            new App(gateway).run();
//        } finally {
//            channel.shutdownNow().awaitTermination(5, TimeUnit.SECONDS);
//        }
//    }

    public static ManagedChannel newGrpcConnection() throws IOException, CertificateException {
        var tlsCertReader = Files.newBufferedReader(TLS_CERT_PATH);
        var tlsCert = Identities.readX509Certificate(tlsCertReader);

        return NettyChannelBuilder.forTarget(PEER_ENDPOINT)
                .sslContext(GrpcSslContexts.forClient().trustManager(tlsCert).build()).overrideAuthority(OVERRIDE_AUTH)
                .build();
    }

    public static Identity newIdentity() throws IOException, CertificateException {
        var certReader = Files.newBufferedReader(CERT_PATH);
        var certificate = Identities.readX509Certificate(certReader);

        return new X509Identity(MSP_ID, certificate);
    }

    public static Signer newSigner() throws IOException, InvalidKeyException {
        var keyReader = Files.newBufferedReader(getPrivateKeyPath());
        var privateKey = Identities.readPrivateKey(keyReader);

        return Signers.newPrivateKeySigner(privateKey);
    }

    private static Path getPrivateKeyPath() throws IOException {
        try (var keyFiles = Files.list(KEY_DIR_PATH)) {
            return keyFiles.findFirst().orElseThrow();
        }
    }

    @Autowired
    public App(final Gateway gateway) {
        // Get a network instance representing the channel where the smart contract is
        // deployed.
        var network = gateway.getNetwork(CHANNEL_NAME);

        // Get the smart contract from the network.
        contract = network.getContract(CHAINCODE_NAME);

    }

    public ResultTemplate run() throws GatewayException, CommitException {
        // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
        initLedger();
        return ResultTemplate.builder().status(HttpStatus.OK.value()).data(null).build();

        // Return all the current assets on the ledger.
//		getAllAssets();

        // Create a new asset on the ledger.
//		createAsset();

        // Update an existing asset asynchronously.
//		transferAssetAsync();

        // Get the asset details by assetID.
//		readAssetById();

        // Update an asset which does not exist.
//		updateNonExistentAsset();
    }

    /**
     * This type of transaction would typically only be run once by an application
     * the first time it was started after its initial deployment. A new version of
     * the chaincode deployed later would likely not need to run an "init" function.
     */
    private void initLedger() throws EndorseException, SubmitException, CommitStatusException, CommitException {
        System.out.println("\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger");

        contract.submitTransaction("InitLedger");

        System.out.println("*** Transaction committed successfully");
    }

    /**
     * Evaluate a transaction to query ledger state.
     */
    public ResultTemplate getAllAssets() {
        try {
            System.out.println("\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger");

            var result = contract.evaluateTransaction("GetAllAssets");

            System.out.println("*** Result: " + prettyJson(result));
            return ResultTemplate.builder().status(HttpStatus.OK.value()).data(prettyJson(result)).build();

        }catch (Exception e){
            return ResultTemplate.builder().status(HttpStatus.BAD_REQUEST.value()).data(e.getMessage()).build();

        }
    }

    private String prettyJson(final byte[] json) {
        return prettyJson(new String(json, StandardCharsets.UTF_8));
    }

    private String prettyJson(final String json) {
        var parsedJson = JsonParser.parseString(json);
        return gson.toJson(parsedJson);
    }

    /**
     * Submit a transaction synchronously, blocking until it has been committed to
     * the ledger.
     */
    public ResultTemplate<Object> createAsset(StockRequestDto request) {
        try {
            System.out.println("\n--> Submit Transaction: CreateAsset, creates new asset with ID, StockSeq, StatementSeq," +
                               " BranchSeq, BranchLocation, BranchName, BranchContract," +
                               " StockName, StockQuantity, StockUnit, StockDate and Status");


            System.out.println("AssetId : " + request.getAssetId());
            System.out.println("PreviousAssetId : " + request.getPreviousAssetId());
            System.out.println("StatementSeq : " + request.getStatementSeq());
            System.out.println("BranchSeq : " + request.getBranchSeq());
            System.out.println("BranchName : " + request.getBranchName());
            System.out.println("Location : " + request.getBranchLocation());
            System.out.println("Contract : " + request.getBranchContract());
            System.out.println("StockName : " + request.getStockName());
            System.out.println("Quantity : " + request.getStockQuantity());
            System.out.println("StockUnit : " + request.getStockUnit());
            System.out.println("StockDate : " + request.getStockDate());
            System.out.println("InoutStatus : " + request.getInoutStatus());
            System.out.println("UseStatus : " + request.getUseStatus());

            var evaluateResult = contract.submitTransaction("CreateAsset", request.getAssetId(),
                    request.getPreviousAssetId(), request.getStatementSeq(), request.getBranchSeq(),
                    request.getBranchLocation(), request.getBranchName(), request.getBranchContract(),
                    request.getStockName(), request.getStockQuantity(), request.getStockUnit(),
                    request.getStockDate(), request.getInoutStatus(), request.getUseStatus());

            System.out.println("*** Transaction committed successfully");
            return ResultTemplate.builder().status(HttpStatus.OK.value()).data(prettyJson(evaluateResult)).build();
        } catch (Exception e) {
            return ResultTemplate.builder().status(HttpStatus.BAD_REQUEST.value()).data(e.getMessage()).build();

        }
    }

    /**
     * Submit transaction asynchronously, allowing the application to process the
     * smart contract response (e.g. update a UI) while waiting for the commit
     * notification.
     */
    private void transferAssetAsync() throws EndorseException, SubmitException, CommitStatusException {
        System.out.println("\n--> Async Submit Transaction: TransferAsset, updates existing asset owner");

        var commit = contract.newProposal("TransferAsset")
                .addArguments(assetId, "Saptha")
                .build()
                .endorse()
                .submitAsync();

        var result = commit.getResult();
        var oldOwner = new String(result, StandardCharsets.UTF_8);

        System.out.println("*** Successfully submitted transaction to transfer ownership from " + oldOwner + " to Saptha");
        System.out.println("*** Waiting for transaction commit");

        var status = commit.getStatus();
        if (!status.isSuccessful()) {
            throw new RuntimeException("Transaction " + status.getTransactionId() +
                                       " failed to commit with status code " + status.getCode());
        }

        System.out.println("*** Transaction committed successfully");
    }

    public ResultTemplate updateAsset(UpdateInfoRequestDto request) {
        try {
            System.out.println("\n--> Async Submit Transaction: UpdateAsset");

            var commit = contract.newProposal("UpdateAsset")
                    .addArguments(request.getAssetId(), "USED")
                    .build()
                    .endorse()
                    .submitAsync();

            var result = commit.getResult();

            System.out.println("*** Waiting for transaction commit");

            var status = commit.getStatus();
            if (!status.isSuccessful()) {
                throw new RuntimeException("Transaction " + status.getTransactionId() +
                                           " failed to commit with status code " + status.getCode());
            }

            System.out.println("*** Transaction committed successfully");
            return ResultTemplate.builder().status(HttpStatus.OK.value()).data(prettyJson(result)).build();
        }catch (Exception e){
            return ResultTemplate.builder().status(HttpStatus.BAD_REQUEST.value()).data(e.getMessage()).build();

        }
    }

    public ResultTemplate deleteAssetById(String assetId){

        try{
            System.out.println("\n--> Evaluate Transaction: DeleteAsset");

            contract.evaluateTransaction("DeleteAsset", assetId);
            return ResultTemplate.builder().status(HttpStatus.BAD_REQUEST.value())
                    .data("Asset " + assetId+"를 삭제하였습니다.")
                    .build();

        }catch (Exception e){
            return ResultTemplate.builder().status(HttpStatus.BAD_REQUEST.value()).data(e.getMessage()).build();

        }
    }

    public ResultTemplate readAssetById(String assetId) {
        try {
            System.out.println("\n--> Evaluate Transaction: ReadAsset, function returns asset attributes");

            var evaluateResult = contract.evaluateTransaction("ReadAsset", assetId);

            System.out.println("*** Result:" + prettyJson(evaluateResult));

            return ResultTemplate.builder().status(HttpStatus.OK.value()).data(prettyJson(evaluateResult)).build();
        } catch (Exception e) {
            return ResultTemplate.builder().status(HttpStatus.BAD_REQUEST.value()).data(e.getMessage()).build();
        }
    }


}
