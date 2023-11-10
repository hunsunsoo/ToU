package com.welcome.tou.common.exception;

public class MismatchException extends RuntimeException {

    public static final String PASSWORD_MISMATCH = "비밀번호가 일치하지 않습니다.";

    public static final String WORKER_AND_BRANCH_MISMATCH = "해당 사업체의 실무자가 아닙니다.";

    public static final String STOCK_IS_NOT_IN_BRANCH = "해당 지점의 재고가 아닙니다.";

    public static final String STATEMENT_IS_NOT_MINE = "해당 거래명세서를 삭제할 권한이 없습니다.";

    public MismatchException(String message){
        super(message);
    }
}
