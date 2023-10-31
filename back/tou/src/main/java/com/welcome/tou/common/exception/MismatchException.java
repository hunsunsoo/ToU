package com.welcome.tou.common.exception;

public class MismatchException extends RuntimeException {

    public static final String PASSWORD_MISMATCH = "비밀번호가 일치하지 않습니다.";

    public MismatchException(String message){
        super(message);
    }
}
