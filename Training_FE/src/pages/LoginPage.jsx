import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken, getToken } from '../services/LocalStorageService';
import { useEffect } from 'react';




const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = getToken();

        if (accessToken) {
            navigate("/");
        }
    }, [navigate]);
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Sending request to:', '/api/v1/auth/login');
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
                username: username,
                password: password,
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = response.data;
            console.log("Response body:", data);

            if (data.code !== 200) {
                throw new Error(data.message);
            }

            setToken(data.result?.token);
            navigate("/");
        } catch (err) {
            console.error('Login error:', err);
            setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                    Đăng nhập
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Tên người dùng"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mb: 2 }}
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
                        sx={{ mb: 2 }}
                    />
                    {error && (
                        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Đăng nhập
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;