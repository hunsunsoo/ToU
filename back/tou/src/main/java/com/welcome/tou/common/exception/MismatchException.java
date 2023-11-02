package com.welcome.tou.common.exception;

public class MismatchException extends RuntimeException {

    public static final String PASSWORD_MISMATCH = "비밀번호가 일치하지 않습니다.";

    public static final String WORKER_AND_BRANCH_MISMATCH = "해당 사업체의 실무자가 아닙니다.";

    public MismatchException(String message){
        super(message);
    }
}
