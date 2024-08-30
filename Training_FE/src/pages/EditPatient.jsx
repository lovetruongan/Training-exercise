import React from 'react'
import {
    Container,
} from "@mui/material";

import EditForm from '../components/EditForm';
import BasicMenu from '../components/BasicMenu';

const EditPatient = () => {
    return (
        <Container>
            <BasicMenu />
            <EditForm />
        </Container>
    )
}
export default EditPatient;
