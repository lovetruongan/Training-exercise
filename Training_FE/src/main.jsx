import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CreatePatient from "./pages/CreatePatient";
import SuccessPage from "./pages/SuccessPage";
import EditPatient from "./pages/EditPatient";
import EditSuccess from "./pages/EditSuccess";
import LoginPage from "./pages/LoginPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<CreatePatient />} />
        <Route path="successPage" element={<SuccessPage />} />
        <Route path="editSuccess" element={<EditSuccess />} />
        <Route path="edit/:patientId" element={<EditPatient />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);