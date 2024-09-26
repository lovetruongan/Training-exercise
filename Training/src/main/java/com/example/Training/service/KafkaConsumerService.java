// src/main/java/com/example/Training/service/KafkaConsumerService.java
package com.example.Training.service;

import com.example.Training.dto.request.EmailRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

    private final MailService mailService;

    @KafkaListener(topics = "send_mail", groupId = "send_mail_id")
    public void listen(EmailRequest emailRequest) {
        try {
            mailService.sendEmail(emailRequest.getRecipients(), emailRequest.getSubject(), emailRequest.getContent(), emailRequest.getFiles());
        } catch (Exception e) {
            log.error("Failed to send email", e);
        }
    }
}