package com.welcome.tou.common.exception;

public class BadRequestException  extends RuntimeException{

    public static final String BAD_PAGE_REQUEST = "page는 1이상인 값입니다.";
    public static final String BAD_VARIABLE_REQUEST ="isMine=true일 경우, myWorkerName은 null이어야 합니다.";



    public BadRequestException(String message) {
        super(message);
    }
}
