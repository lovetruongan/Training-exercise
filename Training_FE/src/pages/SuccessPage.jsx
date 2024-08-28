import React from 'react'
import { Container } from '@mui/material'
import Layout from './Layout'
import CreateSuccess from '../components/createSuccess'

const SuccessPage = () => {
    return (
        <Container>
            <Layout />
            <CreateSuccess />
        </Container>
    )
}

export default SuccessPage