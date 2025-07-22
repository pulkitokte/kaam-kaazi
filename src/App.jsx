import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfileChoice from "./components/ProfileChoice";

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
      <Routes>
        <Route path="/" element={<SplashRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />;
        <Route path="/complete-profile" element={<ProfileChoice />} />
      </Routes>
    </BrowserRouter>
  );
}
