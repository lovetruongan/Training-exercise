import React, { useState, useEffect } from 'react';
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
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { getToken } from "../services/LocalStorageService";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const EditForm = () => {
    const { patientId } = useParams();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();

    const notify = (message, type) => {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        }
    };

    useEffect(() => {
        const accessToken = getToken();
        if (!accessToken) {
            navigate('/login');
        }
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/patients/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const patient = response.data;
                setName(patient.name);
                setGender(patient.gender);
                setAge(patient.age.toString());
                setEmail(patient.email);
                setPhone(patient.phone);
            } catch (error) {
                notify('Bạn không có quyền chỉnh sửa', 'error');
                alert('You do not have permission to edit this patient');
                navigate('/');
            }
        };

        if (patientId) {
            fetchPatient();
        }
    }, [patientId]);

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = name ? "" : "Name is required";
        tempErrors.gender = gender ? "" : "Gender is required";
        tempErrors.age = age && !isNaN(age) ? "" : "Valid age is required";
        tempErrors.email = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Email is invalid";
        tempErrors.phone = phone && /^[0-9]{10}$/.test(phone) ? "" : "Phone number is invalid";
        setErrors(tempErrors);
        if (Object.values(tempErrors).every(x => x === "")) {
            setFormSubmitted(true);
        }
    }

    const handleSave = async () => {
        const patientData = {
            name,
            gender,
            age: parseInt(age),
            email,
            phone
        };

        try {
            const response = await axios.put(`${BASE_URL}/patients/update/${patientId}`, patientData);
            setFormSubmitted(false);
            navigate('/editSuccess');
        } catch (error) {
            console.error('Error updating patient:', error);
        }
    };

    const handleNext = () => {
        validate();
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleBack = () => {
        setFormSubmitted(false);
    };

    const options = ['Male', 'Female'];

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h5" style={{ textAlign: 'left', paddingBottom: 5 }} >Edit Patient</Typography>
            <Grid container spacing={2} style={{ textAlign: 'left' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Patient ID"
                        fullWidth
                        value={patientId}
                        disabled
                    />
                </Grid>
                <Grid item xs={12} sm={10} md={9}>
                    <TextField
                        label="Name*"
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
                        renderInput={(params) => <TextField {...params} label="Gender*" />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Age*"
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
                        label="Phone Number*"
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
                        <Typography variant="body1"><strong>Patient ID*:</strong> {patientId}</Typography>
                        <Typography variant="body1"><strong>Name*:</strong> {name}</Typography>
                        <Typography variant="body1"><strong>Gender*:</strong> {gender}</Typography>
                        <Typography variant="body1"><strong>Age*:</strong> {age}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
                        <Typography variant="body1"><strong>Phone Number*:</strong> {phone}</Typography>
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

export default EditForm;
