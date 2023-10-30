package com.welcome.tou.security.jwt.service;

import com.welcome.tou.client.domain.Worker;
import com.welcome.tou.common.exception.JwtCustomErrorException;
import com.welcome.tou.common.exception.NotFoundException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service("JwtService")
@RequiredArgsConstructor
@Getter
@Slf4j
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;


    // 키 생성
    private static Key getSigningKey(String secretKey) {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        SecretKey key = new SecretKeySpec(keyBytes, "HmacSHA256");
        return key;
    }


    // AccessToken 생성 메서드
    public String createAccessToken(Worker worker) {
        Date now = new Date();

        Claims claims = Jwts.claims();
        claims.setSubject(String.valueOf(worker.getWorkerSeq()))
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenExpirationPeriod));

        claims.put("workerName", worker.getWorkerName()); // custom

        return Jwts.builder().setClaims(claims).signWith(getSigningKey(secretKey), SignatureAlgorithm.HS256).compact();
    }

    // RefreshToken 생성 메서드
    public String createRefreshToken() {
        Date now = new Date();

        Claims claims = Jwts.claims();
        claims.setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenExpirationPeriod));
        return Jwts.builder().setClaims(claims).signWith(getSigningKey(secretKey), SignatureAlgorithm.HS256).compact();
    }


    // 헤더에서 토큰 추출
    public String getAccessToken(HttpServletRequest request) {
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new JwtCustomErrorException(JwtCustomErrorException.TOKEN_NOT_FOUND);
        }

        return authorization.split(" ")[1];
    }

    public String getRefreshToken(HttpServletRequest request) {
        return request.getHeader("RefreshToken");
    }

    public Long getWorkerId(String token) {
        JwtParser parser = Jwts.parserBuilder().setSigningKey(getSigningKey(secretKey)).build();
        return Long.parseLong(parser.parseClaimsJws(token).getBody().getSubject());
    }


    // 토큰 유효성 검증
    public boolean isTokenValid(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey(secretKey))
                .build()
                .parseClaimsJws(token)
                .getBody();

        if(claims.getExpiration().before(new Date())) {
            throw new JwtCustomErrorException(JwtCustomErrorException.EXPIRED_TOKEN);
        }

        return !claims.getExpiration().before(new Date());
    }

}
