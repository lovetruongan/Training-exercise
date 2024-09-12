import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import Layout from './Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SendEmailPage = () => {
    const [recipients] = useState('nguyenbuitruongan2k3@gmail.com');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [fileNames, setFileNames] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('recipients', recipients);
        formData.append('subject', subject);
        formData.append('content', content);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
        }

        const loadingToast = toast.loading("Đang gửi email...");

        try {
            await axios.post(`${BASE_URL}/common/send-email`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.update(loadingToast, { render: "Email đã được gửi thành công", type: "success", isLoading: false, autoClose: 3000 });
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            toast.update(loadingToast, { render: "Gửi email thất bại", type: "error", isLoading: false, autoClose: 5000 });
        }
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
        setFileNames(Array.from(e.target.files).map(file => file.name));
    };

    return (
        <Container>
            <Layout />
            <Typography variant="h4" gutterBottom>
                Gửi Email
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="recipients"
                    label="Người nhận"
                    name="recipients"
                    value={recipients}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'rgba(0, 0, 0, 0.38)', // Màu chữ in mờ
                        },
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="subject"
                    label="Chủ đề"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="content"
                    label="Nội dung"
                    id="content"
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    accept="*/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span">
                        Chọn tệp đính kèm
                    </Button>
                </label>
                {fileNames.length > 0 && (
                    <List>
                        {fileNames.map((name, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={name} />
                            </ListItem>
                        ))}
                    </List>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Gửi Email
                </Button>
            </Box>
            <ToastContainer />
        </Container>
    );
};

export default SendEmailPage;