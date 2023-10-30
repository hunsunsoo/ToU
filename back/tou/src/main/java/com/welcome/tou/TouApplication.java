package com.welcome.tou;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.welcome.tou")
public class TouApplication {

	public static void main(String[] args) {
		SpringApplication.run(TouApplication.class, args);
	}

}
