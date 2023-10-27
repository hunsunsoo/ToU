package com.welcome.tou.security.config;

import com.welcome.tou.security.jwt.filter.JwtAuthenticationProcessingFilter;
import com.welcome.tou.security.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

    private  final JwtService jwtService;

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//    }
}
