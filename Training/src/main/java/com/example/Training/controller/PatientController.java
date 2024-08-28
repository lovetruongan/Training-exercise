package com.example.Training.controller;


import com.example.Training.dto.request.PatientCreateRequest;
import com.example.Training.dto.response.ApiResponse;
import com.example.Training.dto.response.PatientResponse;
import com.example.Training.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("patients")
public class PatientController {
    @Autowired
    PatientService patientService;

    @RequestMapping()
    ApiResponse<List<PatientResponse>> getPatients() {
        return ApiResponse.<List<PatientResponse>>builder()
                .result(patientService.getPatients())
                .message("Success")
                .build();
    }

    @PostMapping("create")
    ApiResponse<PatientResponse> createUser(@RequestBody @Valid PatientCreateRequest request) {
        return ApiResponse.<PatientResponse>builder()
                .result(patientService.createPatient(request))
                .message("User created successfully")
                .build();
    }

}
