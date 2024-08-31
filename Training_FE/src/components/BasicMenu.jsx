import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../services/AuthenticationService';
import image from '../assets/test.jpg';

export default function BasicMenu() {
    const navigate = useNavigate();
    const handleLogout = () => {
        logOut();
        navigate('/login');
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" onClick={() => navigate('/')}>
                        <img src={"https://vinbrain.net/public/uploads/demo/vinbrain-logo_2.png"} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                    </Typography>
                    <Box>
                        <Button color="inherit">User</Button>
                        <Button color="warning" onClick={handleLogout} style={{ marginLeft: 'auto' }}>Đăng xuất</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
