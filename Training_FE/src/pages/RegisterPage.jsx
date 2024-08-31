import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';


const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birth, setBirth] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/users`, { username, password, birth });
            if (response.data.code !== 200) {
                alert(response.data.message);
            } else {
                alert("Đăng ký thành công.");
                navigate('/login');
            }
        } catch (error) {
            alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                <Typography component="h1" variant="h5">
                    Đăng ký
                </Typography>
                <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Tên đăng nhập"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="birth"
                        label="Ngày sinh"
                        name="birth"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={birth}
                        onChange={(e) => setBirth(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Đăng ký
                    </Button>
                    {error && (
                        <Typography color="error" align="center">
                            {error}
                        </Typography>
                    )}
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Đã có tài khoản? <Button color="primary" onClick={() => navigate('/login')}>Đăng nhập</Button>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;
