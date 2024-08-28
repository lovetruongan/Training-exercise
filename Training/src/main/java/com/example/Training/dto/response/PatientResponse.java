package com.example.Training.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PatientResponse {
    Long patient_id;
    String name;
    String gender;
    Integer age;
    String email;
    String phone;
    LocalDate createdAt;
    LocalDate updatedAt;
}
