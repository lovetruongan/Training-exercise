CREATE TABLE patients
(
    patient_id   BIGINT       NOT NULL PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    gender       VARCHAR(50)  NOT NULL,
    age          INT          NOT NULL,
    email        VARCHAR(50),
    phone_number VARCHAR(50)  NOT NULL,
    created_at   TIMESTAMP    NOT NULL,
    updated_at   TIMESTAMP    NOT NULL
);

INSERT INTO patients (patient_id, name, gender, age, email, phone_number, created_at, updated_at)
VALUES (1, 'John Doe', 'Male', 30, 'john.doe@example.com', '123-456-7890', NOW(), NOW()),
       (2, 'Jane Smith', 'Female', 28, 'jane.smith@example.com', '234-567-8901', NOW(), NOW()),
       (3, 'Bob Johnson', 'Male', 45, 'bob.johnson@example.com', '345-678-9012', NOW(), NOW()),
       (4, 'Alice Williams', 'Female', 35, 'alice.williams@example.com', '456-789-0123', NOW(), NOW()),
       (5, 'Michael Brown', 'Male', 50, 'michael.brown@example.com', '567-890-1234', NOW(), NOW()),
       (6, 'Emily Davis', 'Female', 22, 'emily.davis@example.com', '678-901-2345', NOW(), NOW()),
       (7, 'David Wilson', 'Male', 40, 'david.wilson@example.com', '789-012-3456', NOW(), NOW()),
       (8, 'Sophia Martinez', 'Female', 33, 'sophia.martinez@example.com', '890-123-4567', NOW(), NOW()),
       (9, 'Chris Taylor', 'Male', 27, 'chris.taylor@example.com', '901-234-5678', NOW(), NOW()),
       (10, 'Olivia Anderson', 'Female', 29, 'olivia.anderson@example.com', '012-345-6789', NOW(), NOW());

