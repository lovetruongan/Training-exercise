// src/AppRouter.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CreatePatient from "../pages/CreatePatient";
import SuccessPage from "../pages/SuccessPage";
import EditPatient from "../pages/EditPatient";
import EditSuccess from "../pages/EditSuccess";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SendEmailPage from "../pages/SendEmailPage";
import AuthenticationPage from "../pages/AuthenticationPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="create" element={<CreatePatient />} />
                <Route path="successPage" element={<SuccessPage />} />
                <Route path="editSuccess" element={<EditSuccess />} />
                <Route path="edit/:patientId" element={<EditPatient />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="send-email" element={<SendEmailPage />} />
                <Route path="authentication" element={<AuthenticationPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;