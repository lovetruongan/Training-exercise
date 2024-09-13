package com.example.Training.repository;

import com.example.Training.entity.Patient;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientCriteriaRepository extends JpaRepository<Patient, Integer>, JpaSpecificationExecutor<Patient> {

    static Specification<Patient> hasId(Integer patient_id) {
        return (root, query, cb) -> cb.equal(root.get("patient_id"), patient_id);
    }

    static Specification<Patient> hasCreatedAtAsc(Specification<Patient> specification) {
        return (root, query, cb) -> {
            assert query != null;
            query.orderBy(cb.desc(root.get("createdAt")));
            return query.getRestriction();
        };
    }
}
