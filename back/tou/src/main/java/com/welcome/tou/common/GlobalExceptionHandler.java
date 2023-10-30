package com.welcome.tou.common;

import com.welcome.tou.common.exception.NotFoundException;
import com.welcome.tou.common.utils.ResultTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResultTemplate<?> handlerBadRequestExceptions(NotFoundException e) {
        log.error("error",e);
        return ResultTemplate.builder().status(403).data(e.getMessage()).build();
    }
}
