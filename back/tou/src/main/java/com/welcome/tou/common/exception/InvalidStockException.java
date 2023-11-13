package com.welcome.tou.common.exception;

public class InvalidStockException extends RuntimeException{

    public static final String STOCK_USED_ALREADY = "이미 사용된 재고입니다.";

    public static final String STOCK_IS_NOT_NEED_PROCESS = "가공할 수 없는 재고입니다.";

    public static final String STOCK_IS_NOT_SELL = "판매되는 상품이 아닙니다.";

    public InvalidStockException(String message) {
        super(message);
    }
}
