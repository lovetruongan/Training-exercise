import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
    backgroundColor: '#1976d2',
});

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const Logo = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: 'white',
});

export default function BasicMenu() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
                <StyledToolbar>
                    <Logo variant="h6">
                        Vinbrain
                    </Logo>
                    <Box>
                        <Button color="inherit">Trang chủ</Button>
                        <Button color="inherit">Dịch vụ</Button>
                        <Button color="inherit">Liên hệ</Button>
                    </Box>
                </StyledToolbar>
            </StyledAppBar>
        </Box>
    );
}
