
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const CreatePatient = lazy(() => import("../pages/CreatePatient"));
const SuccessPage = lazy(() => import("../pages/SuccessPage"));
const EditPatient = lazy(() => import("../pages/EditPatient"));
const EditSuccess = lazy(() => import("../pages/EditSuccess"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const SendEmailPage = lazy(() => import("../pages/SendEmailPage"));
const AuthenticationPage = lazy(() => import("../pages/AuthenticationPage"));

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRouter;