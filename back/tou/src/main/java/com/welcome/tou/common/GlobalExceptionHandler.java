package com.welcome.tou.common;

import com.welcome.tou.common.exception.MismatchException;
import com.welcome.tou.common.exception.NotFoundException;
import com.welcome.tou.common.utils.ResultTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MismatchException.class)
    public ResultTemplate<?> handlerUnauthorizedException(MismatchException e) {
        log.error("error", e);
        return ResultTemplate.builder().status(401).data(e.getMessage()).build();
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResultTemplate<?> handlerBadRequestExceptions(NoSuchElementException e) {
        log.error("error",e);
        return ResultTemplate.builder().status(403).data(e.getMessage()).build();
    }
}
