package com.example.Training.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    Integer user_id;
    String username;
    String password;
    String role;
    LocalDate birth;
    LocalDate createdAt;
}
