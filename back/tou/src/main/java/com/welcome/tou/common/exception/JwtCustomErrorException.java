package com.welcome.tou.common.exception;

public class JwtCustomErrorException extends RuntimeException{

    public static final String TOKEN_NOT_FOUND = "토큰이 존재하지 않습니다.";

    public static final String EXPIRED_TOKEN = "토큰의 유효기간이 만료되었습니다.";

    public JwtCustomErrorException(String message) {
        super(message);
    }
}
