import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../services/AuthenticationService';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { getUser, removeUser } from '../services/LocalStorageService';

export default function BasicMenu() {
    const navigate = useNavigate();
    const handleLogout = () => {
        logOut();
        removeUser();
        navigate('/login');
    };
    const notify = () => toast("Welcome to VinBrain!");
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" onClick={() => navigate('/')}>
                        <img src={"https://vinbrain.net/public/uploads/demo/vinbrain-logo_2.png"} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                    </Typography>
                    <Typography variant="body1" sx={{ marginLeft: 2 }}>
                        Welcome, {getUser()}
                    </Typography>
                    <Box>
                        <Button color="inherit" onClick={notify}>User</Button>
                        <Button color="inherit" component={Link} to="/send-email">
                            Email
                        </Button>
                        <Button color="warning" onClick={handleLogout} style={{ marginLeft: 100 }}>Đăng xuất</Button>
                    </Box>
                </Toolbar>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}
                />
            </AppBar>
        </Box>
    );
}
