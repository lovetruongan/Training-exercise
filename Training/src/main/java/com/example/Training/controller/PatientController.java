package com.example.Training.controller;


import com.example.Training.dto.request.PatientCreateRequest;
import com.example.Training.dto.request.PatientUpdateRequest;
import com.example.Training.dto.response.PatientResponse;
import com.example.Training.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://localhost:5137")
@RestController
@RequestMapping("patients")
public class PatientController {
    @Autowired
    PatientService patientService;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
        binder.registerCustomEditor(String.class, stringTrimmerEditor);
    }

    @Operation(summary = "Get all patients")
    @GetMapping
    ResponseEntity<List<PatientResponse>> getPatients() {
        return new ResponseEntity<>(patientService.getPatients(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("{patientID}")
    ResponseEntity<PatientResponse> getPatient(@PathVariable("patientID") Integer patientID) {
        return ResponseEntity.ok(patientService.getPatient(patientID));
    }

    @PostMapping("create")
    ResponseEntity<PatientResponse> createUser(@RequestBody @Valid PatientCreateRequest request) {
        return new ResponseEntity<>(patientService.createPatient(request), HttpStatus.CREATED);
    }

    @PutMapping("update/{patientID}")
    ResponseEntity<PatientResponse> updateUser(@Valid @PathVariable Integer patientID, @RequestBody PatientUpdateRequest request) {
        return new ResponseEntity<>(patientService.updatePatient(patientID, request), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("delete/{patientID}")
    ResponseEntity<PatientResponse> deleteUser(@PathVariable Integer patientID) {
        patientService.deletePatient(patientID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
