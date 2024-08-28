import React, { useState } from "react";
import {
    Container,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Grid,
    Pagination,
    Typography
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: ' Name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'gender',
        headerName: 'Gender',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 90,
    },
];

const initialPatients = [
    { id: 1, name: "John Doe", age: 30, gender: "Male" },
    { id: 2, name: "Jane Smith", age: 25, gender: "Female" },
    { id: 3, name: "Sam Brown", age: 40, gender: "Male" },
    { id: 4, name: "Emily Johnson", age: 35, gender: "Female" },
    { id: 5, name: "Michael Davis", age: 28, gender: "Male" },
    { id: 6, name: "Sarah Wilson", age: 32, gender: "Female" },
    { id: 7, name: "David Martinez", age: 45, gender: "Male" },
    { id: 8, name: "Laura Taylor", age: 27, gender: "Female" },
    { id: 9, name: "James Anderson", age: 50, gender: "Male" },
    { id: 10, name: "Sophia Thomas", age: 22, gender: "Female" },
    { id: 11, name: "Chris Lee", age: 38, gender: "Male" },
    { id: 12, name: "Jessica White", age: 29, gender: "Female" },
    { id: 13, name: "Daniel Harris", age: 33, gender: "Male" },
    { id: 14, name: "Megan Clark", age: 26, gender: "Female" },
    { id: 15, name: "Paul Walker", age: 42, gender: "Male" },
];

const PatientList = () => {
    const [patients, setPatients] = useState(initialPatients);
    const [searchName, setSearchName] = useState("");
    const [searchAge, setSearchAge] = useState("");
    const [searchGender, setSearchGender] = useState("");

    const handleSearch = () => {
        const filteredPatients = initialPatients.filter((patient) => {
            return (
                (searchName === "" || patient.name.toLowerCase().includes(searchName.toLowerCase())) &&
                (searchAge === "" || patient.age === parseInt(searchAge)) &&
                (searchGender === "" || patient.gender.toLowerCase() === searchGender.toLowerCase())
            );
        });
        setPatients(filteredPatients);
    };

    return (
        <Container>
            <Typography variant="h4" style={{
                marginBottom: 10,
                marginTop: 10,
                textAlign: 'center'
            }}> Patient List </Typography>
            <DataGrid
                rows={initialPatients}
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
