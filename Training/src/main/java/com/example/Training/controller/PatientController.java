package com.example.Training.controller;


import com.example.Training.dto.request.PatientCreateRequest;
import com.example.Training.dto.request.PatientUpdateRequest;
import com.example.Training.dto.response.ApiResponse;
import com.example.Training.dto.response.PatientResponse;
import com.example.Training.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://localhost:5137")
@RestController
@RequestMapping("patients")
public class PatientController {
    @Autowired
    PatientService patientService;

    @Operation(summary = "Get all patients")
    @GetMapping
    ApiResponse<List<PatientResponse>> getPatients() {
        return ApiResponse.<List<PatientResponse>>builder()
                .result(patientService.getPatients())
                .message("Success")
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("{patientID}")
    ApiResponse<PatientResponse> getPatient(@PathVariable("patientID") Integer patientID) {
        return ApiResponse.<PatientResponse>builder()
                .result(patientService.getPatient(patientID))
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

    @PutMapping("update/{patientID}")
    ApiResponse<PatientResponse> updateUser(@Valid @PathVariable Integer patientID, @RequestBody PatientUpdateRequest request) {
        return ApiResponse.<PatientResponse>builder()
                .result(patientService.updatePatient(patientID, request))
                .message("User updated successfully")
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("delete/{patientID}")
    ApiResponse<PatientResponse> deleteUser(@PathVariable Integer patientID) {
        patientService.deletePatient(patientID);
        return ApiResponse.<PatientResponse>builder()
                .message("User deleted successfully")
                .build();
    }
}
