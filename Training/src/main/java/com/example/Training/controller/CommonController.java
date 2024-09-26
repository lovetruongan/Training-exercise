package com.example.Training.controller;

import com.example.Training.dto.request.EmailRequest;

import com.example.Training.service.KafkaProducerService;

import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class CommonController {

    private final KafkaProducerService kafkaProducerService;

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestParam String recipients, @RequestParam String subject,
                                       @RequestParam String content, @RequestParam(required = false) MultipartFile[] files) {
        EmailRequest emailRequest = new EmailRequest();
        emailRequest.setRecipients(recipients);
        emailRequest.setSubject(subject);
        emailRequest.setContent(content);
        emailRequest.setFiles(files);

        kafkaProducerService.sendMessage("send_mail", emailRequest);
        return ResponseEntity.status(ACCEPTED).body("Email request sent to Kafka");
    }
}
