package com.welcome.tou.common;

import com.welcome.tou.common.exception.*;
import com.welcome.tou.common.utils.ResultTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({NotFoundException.class, MismatchException.class,
            InvalidTradeException.class, BadRequestException.class, InvalidStockException.class})
    public ResultTemplate<?> handlerBadRequestExceptions(Exception e) {
        log.error("error", e);
        return ResultTemplate.builder().status(HttpStatus.BAD_REQUEST.value()).data(e.getMessage()).build();
    }
}
