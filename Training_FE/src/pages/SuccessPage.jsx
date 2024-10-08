import React from 'react'
import { Container } from '@mui/material'
import Layout from './Layout'
import CreateSuccess from '../components/CreateSuccess'

const SuccessPage = () => {
    return (
        <Container>
            <Layout />
            <CreateSuccess />
        </Container>
    )
}

export default SuccessPage