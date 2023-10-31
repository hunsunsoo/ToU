package com.welcome.tou.common.exception;

public class NotFoundException extends RuntimeException {

    public static final String WORKER_NOT_FOUND = "유저정보가 존재하지 않습니다.";

    public NotFoundException(String message) {
        super(message);
    }
}
