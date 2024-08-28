import React from 'react'
import {
    Container,

} from "@mui/material";
import CreateForm from '../components/CreateForm';
import BasicMenu from '../components/BasicMenu';

const CreatePatient = () => {
    return (
        <Container>
            <BasicMenu />
            <CreateForm />
        </Container>
    )
}
export default CreatePatient;
