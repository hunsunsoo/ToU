package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class YourSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(YourSpringApplication.class, args);
    }

    // 여기에 필요한 @Bean 정의를 추가할 수 있습니다.
}
