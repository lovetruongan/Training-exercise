package com.example.Training.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PatientCreateRequest {
    String name;
    String gender;
    Integer age;
    String email;
    String phone;
}
