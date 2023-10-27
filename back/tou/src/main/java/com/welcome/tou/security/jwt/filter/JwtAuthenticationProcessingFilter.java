package com.welcome.tou.security.jwt.filter;

import com.welcome.tou.client.domain.Worker;
import com.welcome.tou.client.domain.WorkerRepository;
import com.welcome.tou.security.jwt.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private static final String NO_CHECK_URL = "/login";

    private final JwtService jwtService;
    private final WorkerRepository workerRepository;

    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (request.getRequestURI().equals(NO_CHECK_URL)) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = jwtService.getAccessToken(request);
        String refreshToken = jwtService.getRefreshToken(request);

        if(accessToken != null && jwtService.isTokenValid(accessToken)) {
            Long workerId = jwtService.getWorkerId(accessToken);

            Optional<Worker> myWorker = workerRepository.findById(workerId);
            myWorker.ifPresent(this::saveAuthentication);
            filterChain.doFilter(request, response);
        }
    }

    public void saveAuthentication(Worker worker) {
        String password = worker.getPassword();

        UserDetails userDetailsWorker = org.springframework.security.core.userdetails.User.builder()
                .username(worker.getWorkerName())
                .password(password)
                .roles(worker.getRole().name())
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetailsWorker, null,
                authoritiesMapper.mapAuthorities(userDetailsWorker.getAuthorities()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
