package com.welcome.tou.common.exception;

public class NotFoundException extends RuntimeException {

//    public static final String TOKEN_NOT_FOUND = "토큰이 존재하지 않습니다.";

    public NotFoundException(String message) {
        super(message);
    }
}
