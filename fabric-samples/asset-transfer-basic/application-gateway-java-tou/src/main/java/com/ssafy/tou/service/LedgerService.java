package com.ssafy.tou.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParser;
import com.ssafy.tou.common.utils.ResultTemplate;
//import com.ssafy.tou.example.EnrollAdmin;
//import com.ssafy.tou.example.RegisterUser;
import io.grpc.ManagedChannel;
import io.grpc.netty.shaded.io.grpc.netty.GrpcSslContexts;
import io.grpc.netty.shaded.io.grpc.netty.NettyChannelBuilder;
import lombok.RequiredArgsConstructor;
import org.hyperledger.fabric.client.*;
import org.hyperledger.fabric.client.identity.*;
//import org.hyperledger.fabric.gateway.*;
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
public class LedgerService {

    public ResultTemplate<?> init() throws Exception {
        App.main(null);

        return ResultTemplate.builder().status(200).data(null).build();
    }


}
