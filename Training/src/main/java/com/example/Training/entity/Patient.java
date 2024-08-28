package com.example.Training.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;


import java.time.LocalDate;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id", nullable = false)
    private Integer patient_id;

    @Size(max = 255)
    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Size(max = 50)
    @NotNull
    @Column(name = "gender", nullable = false, length = 50)
    private String gender;

    @NotNull
    @Column(name = "age", nullable = false)
    private Integer age;

    @Size(max = 50)
    @Email
    @Column(name = "email", length = 50)
    private String email;

    @Size(max = 50)
    @NotNull
    @Column(name = "phone_number", nullable = false, length = 50)
    private String phone;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;

    @NotNull
    @Column(name = "updated_at", nullable = false)
    private LocalDate updatedAt;


    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDate.now();
        this.updatedAt = LocalDate.now();
    }
}