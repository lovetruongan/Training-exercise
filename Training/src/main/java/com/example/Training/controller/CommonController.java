package com.example.Training.controller;

import com.example.Training.exception.CustomException;
import com.example.Training.exception.ErrorCode;
import com.example.Training.service.MailService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;

import static org.springframework.http.HttpStatus.ACCEPTED;

@Slf4j
@RestController
@RequestMapping("/common")
public record CommonController(MailService mailService) {

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestParam String recipients, @RequestParam String subject,
                                       @RequestParam String content, @RequestParam(required = false) MultipartFile[] files) {
        try {
            String result = mailService.sendEmail(recipients, subject, content, files);
            return ResponseEntity.status(ACCEPTED).body(result);
        } catch (UnsupportedEncodingException | MessagingException e) {
            throw new CustomException(ErrorCode.MAIL_SEND_FAILURE);
        }
    }
}
