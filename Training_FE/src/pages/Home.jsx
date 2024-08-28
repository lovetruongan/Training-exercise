import React from 'react'
import PatientList from '../components/PatientList';
import BasicMenu from '../components/BasicMenu';
import { Container } from '@mui/material';

export const Home = () => {
    return (
        <Container>

            <BasicMenu />
            <PatientList />
        </Container>
    )
}
export default Home;