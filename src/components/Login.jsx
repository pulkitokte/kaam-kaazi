import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { FiMail, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/complete-profile"); // Redirect on success
    } catch (error) {
      console.error("Login error:", error.message); 
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f83758] relative overflow-hidden font-worksans">
      {/* Decorative Background Images */}
      <div className="absolute top-0 left-0 w-[200px] -rotate-45 opacity-80">
        <img src="/public/SignUpSS.png" alt="left background" />
      </div>
      <div className="absolute bottom-0 right-0 w-[300px] rotate-45 opacity-80">
        <img src="/public/ChooseProfileSS.png " alt="right background" />
      </div>

      {/* Login Card */}
      <div className="bg-[#dedede] rounded-xl px-8 py-10 w-full max-w-md z-10 shadow-2xl text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">
          Welcome <br /> Back!!
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 pr-10 font-medium text-sm rounded-md focus:outline-none bg-white border-none"
            />
            <FiMail className="absolute right-3 top-2.5 text-[#7b7b7c]" />
          </div>

          {/* Password Input with Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 pr-10 font-medium text-sm rounded-md focus:outline-none bg-white border-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-2.5 text-[#7b7b7c]"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs text-[#6c757d]">
            <label className="flex items-center gap-1 font-semibold">
              <input type="checkbox" className="accent-[#F83758]" />
              Remember Me
            </label>
            <a
              href="#"
              className="text-[#F83758] font-semibold italic hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white text-base font-semibold py-2 rounded-md hover:bg-gray-900 transition cursor-pointer"
          >
            LOGIN
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-sm mt-4 text-black">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-[#F83758] font-semibold italic cursor-pointer hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
