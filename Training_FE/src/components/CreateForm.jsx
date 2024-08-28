import React, { useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Autocomplete,
    Paper,
    Box,
    Modal
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";
import CreateSuccess from './createSuccess';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CreateForm = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = name ? "" : "Name is required";
        tempErrors.gender = gender ? "" : "Gender is required";
        tempErrors.age = age && !isNaN(age) ? "" : "Valid age is required";
        tempErrors.email = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : " email is invalid";
        tempErrors.phone = phone && /^[0-9]{10}$/.test(phone) ? "" : " phone number is invalid";
        setErrors(tempErrors);
        console.log(tempErrors);
        if (Object.values(tempErrors).every(x => x === "")) {
            setFormSubmitted(true);
        };
    }
    const handleSave = async () => {
        const patientData = {
            name,
            gender,
            age,
            email,
            phone
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/patients/create', patientData);
            setFormSubmitted(false);
            navigate('/successPage');
        } catch (error) {
            console.error('Error saving patient:', error);
        }
    };

    const handleNext = () => {
        validate();
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleBack = () => {
        // Return to previous page
        setFormSubmitted(false);

    };
    const options = ['Male', 'Female'];

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h5" style={{ textAlign: 'left', paddingBottom: 5 }} >Create New Patient</Typography>
            <Grid container spacing={2} style={{ textAlign: 'left' }}>
                <Grid item xs={12} sm={10} md={9}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                </Grid>
                <Grid item xs={12} sm={3} md={4}>
                    <Autocomplete
                        disablePortal
                        options={options}
                        value={gender}
                        onChange={(event, newValue) => setGender(newValue)}
                        renderInput={(params) => <TextField {...params} label="Gender" />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Age"
                        value={age}
                        fullWidth
                        onChange={(e) => setAge(e.target.value)}
                        error={!!errors.age}
                        helperText={errors.age}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    <TextField
                        label="Phone Number"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleCancel} style={{ marginLeft: 10 }}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
            {formSubmitted && (
                <Modal open={formSubmitted} onClose={() => setFormSubmitted(false)}>
                    <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h5" component="h2" marginX={10}>
                            Patient Information
                        </Typography>
                        <Typography variant="body1"><strong>Name:</strong> {name}</Typography>
                        <Typography variant="body1"><strong>Gender:</strong> {gender}</Typography>
                        <Typography variant="body1"><strong>Age:</strong> {age}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
                        <Typography variant="body1"><strong>Phone Number:</strong> {phone}</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={3} style={{ marginTop: 20 }}>
                                <Button variant="contained" color="success" onClick={handleSave} >
                                    Save
                                </Button>
                            </Grid>
                            <Grid item xs={8} style={{ marginTop: 20 }}>
                                <Button variant="contained" onClick={handleBack}>
                                    Back
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            )}
        </Paper>
    );
};

export default CreateForm;