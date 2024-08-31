import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';


export default function BasicMenu() {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" onClick={() => navigate('/')}>
                        <img src={'/assets/test.jpg'} alt="logo" style={{ width: '100px', height: '50px' }} />
                    </Typography>
                    <Box>
                        <Button color="inherit">Trang chủ</Button>
                        <Button color="inherit">Dịch vụ</Button>
                        <Button color="inherit">Liên hệ</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
