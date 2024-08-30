import React from 'react'
import { Button, Container, Typography, Paper } from '@mui/material'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
    maxWidth: 400,
    margin: '0 auto',
    marginTop: theme.spacing(8),
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
}));

const EditSuccessForm = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <StyledPaper elevation={3}>
                <CheckCircleOutline color="success" style={{ fontSize: 60 }} />
                <Typography variant="h5" component="h2" align="center">
                    Update patient Success
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/')}
                    size="large"
                    fullWidth
                >
                    Back to home
                </Button>
            </StyledPaper>
        </Container>
    )
}

export default EditSuccessForm