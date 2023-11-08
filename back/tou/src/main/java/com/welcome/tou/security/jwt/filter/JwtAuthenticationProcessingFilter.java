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

    private static final String NO_CHECK_URL_LOGIN = "/api/client/login";
    private static final String NO_CHECK_URL_CONSUMER = "/api/consumer";

    private final JwtService jwtService;
    private final WorkerRepository workerRepository;

    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 로그인 요청에 대해서는 다음 필터 호출
        if (request.getRequestURI().equals(NO_CHECK_URL_LOGIN)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 소비자 요청
        if (request.getRequestURI().contains(NO_CHECK_URL_CONSUMER)) {
            filterChain.doFilter(request, response);
            return;
        }

        // 요청에서 토큰 추출
        String accessToken = jwtService.getAccessToken(request);
        String refreshToken = jwtService.getRefreshToken(request);


        if(accessToken != null && jwtService.isTokenValid(accessToken)) {
            Long workerId = jwtService.getWorkerId(accessToken);

            Optional<Worker> myWorker = workerRepository.findById(workerId);
            myWorker.ifPresent(this::saveAuthentication);
            filterChain.doFilter(request, response);
            return;
        }

        filterChain.doFilter(request, response);
    }

    // 토큰 인증 이후 SecurityContextHolder에 담아 권한처리
    public void saveAuthentication(Worker worker) {
        String password = worker.getPassword();

        UserDetails userDetailsWorker = org.springframework.security.core.userdetails.User.builder()
                .username(String.valueOf(worker.getWorkerSeq()))
                .password(password)
                .roles(worker.getRole().name())
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetailsWorker, null,
                authoritiesMapper.mapAuthorities(userDetailsWorker.getAuthorities()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
