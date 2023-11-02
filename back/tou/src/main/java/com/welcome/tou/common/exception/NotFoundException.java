package com.welcome.tou.common.exception;

public class NotFoundException extends RuntimeException {

    public static final String WORKER_NOT_FOUND = "유저정보가 존재하지 않습니다.";
    public static final String BRANCH_NOT_FOUND = "존재하지 않는 관할구역입니다.";
    public static final String STATEMENT_NOT_FOUND = "존재하지 않는 거래명세서입니다.";

    public NotFoundException(String message) {
        super(message);
    }
}
