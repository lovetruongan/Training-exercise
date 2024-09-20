package com.example.Training.controller;

import com.example.Training.entity.Patient;
import com.example.Training.service.PatientService;
import com.example.openapi.api.PatientsApiDelegate;
import com.example.openapi.model.PatientCreateRequest;
import com.example.openapi.model.PatientResponse;
import com.example.openapi.model.PatientUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.*;


import java.util.List;

@Controller
@RestController
@RequestMapping("patients")
public class PatientApiController implements PatientsApiDelegate {
    @Autowired
    PatientService patientService;

    @Override
    @GetMapping
    public ResponseEntity<List<PatientResponse>> getPatients() {
        List<PatientResponse> patients = patientService.getPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("{patientID}")
    public ResponseEntity<PatientResponse> getPatient(@PathVariable("patientID") Integer patientID) {
        return ResponseEntity.ok(patientService.getPatient(patientID));
    }

    @PostMapping("create")
    public ResponseEntity<PatientResponse> createUser(@RequestBody @Valid PatientCreateRequest request) {
        return new ResponseEntity<>(patientService.createPatient(request), HttpStatus.CREATED);
    }

    @PutMapping("update/{patientID}")
    public ResponseEntity<PatientResponse> updateUser(@Valid @PathVariable Integer patientID, @RequestBody PatientUpdateRequest request) {
        return new ResponseEntity<>(patientService.updatePatient(patientID, request), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("delete/{patientID}")
    ResponseEntity<PatientResponse> deleteUser(@PathVariable Integer patientID) {
        patientService.deletePatient(patientID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
