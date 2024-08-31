package com.example.Training.mapper;

import com.example.Training.dto.request.PatientCreateRequest;
import com.example.Training.dto.response.PatientResponse;
import com.example.Training.entity.Patient;

import java.util.List;
import java.util.stream.Collectors;

public class PatientMapper {
    public static PatientResponse toPatientResponse(Patient patient) {
        return PatientResponse.builder()
                .patient_id(Long.valueOf(patient.getPatient_id()))
                .name(patient.getName())
                .gender(patient.getGender())
                .age(patient.getAge())
                .email(patient.getEmail())
                .phone(patient.getPhone())
                .createdAt(patient.getCreatedAt())
                .updatedAt(patient.getUpdatedAt())
                .build();
    }

    public static Patient toPatient(PatientCreateRequest request) {
        return Patient.builder()
                .name(request.getName())
                .gender(request.getGender())
                .age(request.getAge())
                .email(request.getEmail())
                .phone(request.getPhone())
                .build();
    }

    public static List<PatientResponse> toPatientResponseList(List<Patient> patients) {
        return patients.stream()
                .map(PatientMapper::toPatientResponse).collect(Collectors.toList());
    }
}
