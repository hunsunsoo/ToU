package com.welcome.tou.common.exception;

public class NotFoundException extends RuntimeException {

    public static final String WORKER_NOT_FOUND = "유저정보가 존재하지 않습니다.";
    public static final String PASS_NOT_FOUND = "인증 등록 정보가 존재하지 않습니다.";
    public static final String BRANCH_NOT_FOUND = "관할구역이 존재하지 않습니다.";
    public static final String STATEMENT_NOT_FOUND = "존재하지 않는 거래명세서입니다.";
    public static final String STOCK_NOT_FOUND = "존재하지 않는 재고입니다.";
    public static final String STOCK_FOR_SIGN_NOT_FOUND = "서명 가능한 거래명세서가 없습니다.";
    public static final String COMPANY_NOT_FOUND = "존재하지 않는 회사입니다.";

    public NotFoundException(String message) {
        super(message);
    }
}
