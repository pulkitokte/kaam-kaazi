// App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfileChoice from "./components/ProfileChoice";
import Home from "./pages/Home";
import IndividualProfile from "./components/IndividualProfile";
import BusinessProfile from "./components/BusinessProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SplashRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return <SplashScreen />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<SplashRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/complete-profile" element={<ProfileChoice />} />
        <Route path="/home" element={<Home />} />
        <Route path="/individual-profile" element={<IndividualProfile />} />
        <Route path="/business-profile" element={<BusinessProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
