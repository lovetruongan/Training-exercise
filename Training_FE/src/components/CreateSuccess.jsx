import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';



const CreateSuccess = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h6" component="h2">
                Successfully created a new patient
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
            >
                Back to home
            </Button>
        </Box>
    )
}

export default CreateSuccess