package com.example.Training.mapper;

import com.example.Training.entity.Patient;
import com.example.openapi.model.PatientCreateRequest;
import com.example.openapi.model.PatientResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface PatientMapper {
    @Mapping(target = "patientId", source = "patient_id")
    PatientResponse toPatientResponse(Patient patient);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "patient_id", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Patient toPatient(PatientCreateRequest request);


}

