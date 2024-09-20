import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../services/LocalStorageService';
import { BASE_URL } from '../constants/constants';
import { CircularProgress, Typography, Box } from '@mui/material';
import axios from 'axios';

const AuthenticationPage = () => {
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {
        console.log(window.location.href);

        const authCodeRegex = /code=(.*)/;
        const isMatch = window.location.href.match(authCodeRegex);

        if (isMatch) {
            const authCode = isMatch[1];
            console.log(authCode);

            fetch(
                `${BASE_URL}/auth/outbound/authentication?code=${authCode}`,
                {
                    method: "POST",
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setToken(data?.token);
                    setIsLoggedin(true);
                });
        }
    }, []);

    useEffect(() => {
        if (isLoggedin) {
            navigate("/");
        }
    }, [isLoggedin, navigate]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress></CircularProgress>
                <Typography>Authenticating...</Typography>
            </Box>
        </>
    );
}
export default AuthenticationPage