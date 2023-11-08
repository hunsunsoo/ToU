package com.welcome.tou.common.exception;

public class InvalidDistributionCodeException extends RuntimeException{

    public static final String INVALID_DISTRIBUTION_CODE_FORM = "유통 과정 코드가 형식에 맞지 않습니다.";

    public InvalidDistributionCodeException(String message) {
        super(message);
    }
}
