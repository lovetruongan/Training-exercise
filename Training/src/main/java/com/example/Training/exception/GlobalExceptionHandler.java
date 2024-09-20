package com.example.Training.exception;

import com.example.Training.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(value = CustomException.class)
    ResponseEntity<?> handlingCustomException(CustomException exception) {
        log.error(("CustomException: "), exception);
        ErrorCode errorCode = exception.getErrorCode();


        return ResponseEntity.badRequest().body(errorCode.getMessage());
    }
}
