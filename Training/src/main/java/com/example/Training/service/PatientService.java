package com.example.Training.service;

import com.example.Training.dto.request.PatientCreateRequest;
import com.example.Training.dto.request.PatientUpdateRequest;
import com.example.Training.dto.response.PatientResponse;
import com.example.Training.entity.Patient;
import com.example.Training.exception.CustomException;
import com.example.Training.exception.ErrorCode;
import com.example.Training.repository.PatientRepository;
import jakarta.validation.constraints.Null;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;

@Service
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class PatientService {
    PatientRepository patientRepository;

    public List<PatientResponse> getPatients() {
        return patientRepository.findAll().stream()
                .map(patient -> PatientResponse.builder()
                        .patient_id(Long.valueOf(patient.getPatient_id()))
                        .name(patient.getName())
                        .gender(patient.getGender())
                        .age(patient.getAge())
                        .email(patient.getEmail())
                        .phone(patient.getPhone())
                        .createdAt(patient.getCreatedAt())
                        .updatedAt(patient.getUpdatedAt())
                        .build())
                .toList();
    }

    public PatientResponse getPatient(Integer patientID) {
        Patient patient = patientRepository.findById(patientID)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_EXISTED));
        return PatientResponse.builder()
                .patient_id(Long.valueOf(patient.getPatient_id()))
                .name(patient.getName())
                .gender(patient.getGender())
                .age(patient.getAge())
                .email(patient.getEmail())
                .phone(patient.getPhone())
                .build();
    }

    public PatientResponse createPatient(PatientCreateRequest request) {
        if (patientRepository.existsByName(request.getName())) {
            log.error("Patient with name {} already exists", request.getName());
            throw new CustomException(ErrorCode.USER_EXISTED);
        }
        Patient patient = Patient.builder()
                .name(request.getName())
                .gender(request.getGender())
                .age(request.getAge())
                .email(request.getEmail())
                .phone(request.getPhone())
                .build();
        return PatientResponse.builder()
                .patient_id(Long.valueOf(patientRepository.save(patient).getPatient_id()))
                .name(patient.getName())
                .gender(patient.getGender())
                .age(patient.getAge())
                .email(patient.getEmail())
                .phone(patient.getPhone())
                .createdAt(patient.getCreatedAt())
                .updatedAt(patient.getUpdatedAt())
                .build();
    }

    public PatientResponse updatePatient(Integer patientID, PatientUpdateRequest request) {
        Patient patient = patientRepository.findById(patientID)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_EXISTED));
        patient.setName(request.getName());
        patient.setGender(request.getGender());
        patient.setAge(request.getAge());
        patient.setEmail(request.getEmail());
        patient.setPhone(request.getPhone());
        patient.setUpdatedAt(LocalDate.now());
        return PatientResponse.builder()
                .patient_id(Long.valueOf(patientRepository.save(patient).getPatient_id()))
                .name(patient.getName())
                .gender(patient.getGender())
                .age(patient.getAge())
                .email(patient.getEmail())
                .phone(patient.getPhone())
                .createdAt(patient.getCreatedAt())
                .updatedAt(patient.getUpdatedAt())
                .build();
    }

    public void deletePatient(Integer patientID) {
        patientRepository.deleteById(patientID);
    }
}
