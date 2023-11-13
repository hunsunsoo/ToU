package com.welcome.tou.common.exception;

public class FailTransactionExcepction extends RuntimeException{

    public static final String CREATE_TRANSACTION_FAIL = "재고 생성 트랜잭션이 실패했습니다.";
    public static final String UPDATE_TRANSACTION_FAIL = "재고 업데이트 트랜잭션이 실패했습니다.";

    public FailTransactionExcepction(String message){ super(message);}
}
