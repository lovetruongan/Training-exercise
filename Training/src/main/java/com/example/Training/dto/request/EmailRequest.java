// src/main/java/com/example/Training/dto/EmailRequest.java
package com.example.Training.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class EmailRequest {
    private String recipients;
    private String subject;
    private String content;
    private MultipartFile[] files;
}