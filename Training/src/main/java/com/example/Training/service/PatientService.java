package com.example.Training.service;

import com.example.Training.dto.request.PatientCreateRequest;
import com.example.Training.dto.request.PatientUpdateRequest;
import com.example.Training.dto.response.PatientResponse;
import com.example.Training.entity.Patient;
import com.example.Training.exception.CustomException;
import com.example.Training.exception.ErrorCode;
import com.example.Training.mapper.PatientMapper;
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
        return PatientMapper.toPatientResponseList(patientRepository.findAll());
    }

    public PatientResponse getPatient(Integer patientID) {
        Patient patient = patientRepository.findById(patientID)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_EXISTED));
        return PatientMapper.toPatientResponse(patient);
    }

    public PatientResponse createPatient(PatientCreateRequest request) {
        if (patientRepository.existsByName(request.getName())) {
            log.error("Patient with name {} already exists", request.getName());
            throw new CustomException(ErrorCode.USER_EXISTED);
        }
        Patient patient = PatientMapper.toPatient(request);
        patient.setCreatedAt(LocalDate.now());
        patient.setUpdatedAt(LocalDate.now());
        return PatientMapper.toPatientResponse(patientRepository.save(patient));
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

        return PatientMapper.toPatientResponse(patientRepository.save(patient));
    }

    public void deletePatient(Integer patientID) {
        patientRepository.deleteById(patientID);
    }
}
