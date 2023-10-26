package com.welcome.tou;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class TouApplication {

	public static void main(String[] args) {
		SpringApplication.run(TouApplication.class, args);
	}

}
