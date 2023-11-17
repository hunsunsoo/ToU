package com.ssafy.tou.configuration;

import com.ssafy.tou.service.App;
import org.hyperledger.fabric.client.Gateway;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@ComponentScan
public class HyperledgerFabricConfig {

    @Bean
    public Gateway gatewayBuilder() throws Exception {
        // 여기에 기존에 main 메서드에 있던 Gateway 빌더 관련 코드를 넣습니다.
        // 예를 들어, newIdentity(), newSigner(), newGrpcConnection() 등의 메서드 호출을 포함합니다.
        // 예시:
        var channel = App.newGrpcConnection();
        return Gateway.newInstance()
                .identity(App.newIdentity())
                .signer(App.newSigner())
                .connection(channel)
                .evaluateOptions(options -> options.withDeadlineAfter(5, TimeUnit.SECONDS))
                .endorseOptions(options -> options.withDeadlineAfter(15, TimeUnit.SECONDS))
                .submitOptions(options -> options.withDeadlineAfter(5, TimeUnit.SECONDS))
                .commitStatusOptions(options -> options.withDeadlineAfter(1, TimeUnit.MINUTES))
                .connect();
    }

//    @Bean
//    public Gateway gateway(Gateway.Builder builder) throws Exception {
//        return builder.connect();
//    }
}
