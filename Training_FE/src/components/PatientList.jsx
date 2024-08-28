import React, { useState } from "react";
import {
    Container,
    Button,
    Grid,
    Pagination,
    Typography
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect } from "react";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: ' Name', width: 200 },
    {
        field: 'gender',
        headerName: 'Gender',
        width: 90,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
    },
    {
        field: 'phone',
        headerName: 'Phone_number',
        type: 'number',
        width: 200,
    },
];


const PatientList = () => {
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/patients');
                const transformedPatients = response.data.result.map(patient => ({
                    ...patient,
                    id: patient.patient_id // Map patient_id to id
                }));
                setPatients(transformedPatients);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);


    return (
        <Container>
            <Typography variant="h4" style={{
                marginBottom: 10,
                marginTop: 10,
                textAlign: 'center'
            }}> Patient List </Typography>
            <DataGrid
                rows={patients}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ overflow: 'clip' }}
            />
            <Grid container spacing={2} >
                <Grid item xs={3} style={{ marginTop: 20 }}>
                    <Button variant="contained" color="success" href="/create" >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PatientList;
