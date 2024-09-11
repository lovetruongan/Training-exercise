package com.example.Training.mapper;

import com.example.Training.dto.request.PatientCreateRequest;
import com.example.Training.dto.response.PatientResponse;
import com.example.Training.entity.Patient;
import org.mapstruct.Mapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PatientMapper {
    PatientResponse toPatientResponse(Patient patient);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "patient_id", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Patient toPatient(PatientCreateRequest request);


}

