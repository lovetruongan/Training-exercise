import React, { useState, useEffect } from "react";
import {
    Container,
    Button,
    Grid,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/api/v1";

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleEdit = (id) => {
        console.log('Edit bệnh nhân có ID:', id);
        navigate(`/edit/${id}`);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDeleteId(null);
    };

    const handleConfirmDelete = () => {
        if (deleteId) {
            handleDelete(deleteId);
            handleCloseDialog();
        }
    };

    const handleDelete = (id) => {
        axios.delete(`${BASE_URL}/patients/delete/${id}`)
            .then(response => {
                setPatients(prevPatients => prevPatients.filter(patient => patient.id !== id));
            })
            .catch(error => {
                console.error('Lỗi khi xóa bệnh nhân:', error);
            });
    };

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
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: 16 }}
                        onClick={() => handleEdit(params.row.id)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteClick(params.row.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/patients`);
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
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete Patient"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this patient? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PatientList;
