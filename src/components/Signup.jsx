// components/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";
import { FaUser, FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && isNaN(email.split("@")[0]);
  };

  const isStrongPassword = (password) => {
    const strengthRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;
    return strengthRegex.test(password);
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) return setPasswordStrength("");
    else if (isStrongPassword(password)) setPasswordStrength("Strong");
    else if (/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/.test(password))
      setPasswordStrength("Medium");
    else setPasswordStrength("Weak");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
    if (name === "password") evaluatePasswordStrength(value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { fullName, userName, email, countryCode, phone, password } =
      formData;
    setErrors({});

    // Username alphanumeric
    if (!/^[a-zA-Z0-9]+$/.test(userName)) {
      return setErrors((err) => ({
        ...err,
        userName: "Only letters & numbers allowed.",
      }));
    }

    // Username uniqueness
    try {
      const q = query(
        collection(db, "users"),
        where("userName", "==", userName)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        return setErrors((err) => ({
          ...err,
          userName: "That username is taken.",
        }));
      }
    } catch {
      return setErrors((err) => ({
        ...err,
        userName: "Could not validate username.",
      }));
    }

    // Email validation
    if (!isValidEmail(email)) {
      return setErrors((err) => ({
        ...err,
        email:
          "Enter a valid email. Shouldn't start with a number or be all numeric.",
      }));
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
      return setErrors((err) => ({
        ...err,
        phone: "Phone must be exactly 10 digits.",
      }));
    }

    // Password strength
    if (!isStrongPassword(password)) {
      return setErrors((err) => ({
        ...err,
        password:
          "Min 6 characters with at least 1 uppercase, 1 number & 1 special character.",
      }));
    }

    // Create user and save to Firestore
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;

      const userData = {
        uid: user.uid,
        fullName,
        userName,
        email,
        phone: `${countryCode}${phone}`,
        createdAt: new Date(),
        profileType: "individual",
      };

      await setDoc(doc(db, "users", user.uid), userData);

      // ✅ Set localStorage for profile sync
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("profileType", "individual");
      localStorage.setItem("isProfileCompleted", "false");

      // ✅ These two are needed for profile fallback
      localStorage.setItem("username", userName);
      localStorage.setItem("mobile", `${countryCode}${phone}`);

      navigate("/complete-profile");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        return setErrors((e) => ({
          ...e,
          email: "Email already registered.",
        }));
      }
      console.error("Signup Error:", err);
      setErrors((e) => ({ ...e, signup: "Signup failed. Please try again." }));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f83758] relative overflow-hidden font-worksans">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-[300px] -rotate-45 opacity-80">
        <img src="/left-ui.png" alt="right bg" />
      </div>
      <div className="absolute bottom-0 left-0 w-[300px] rotate-45 opacity-80">
        <img src="/right-ui.png" alt="left bg" />
      </div>

      <div className="bg-[#d9d9d9] rounded-xl p-8 w-full max-w-md shadow-md">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#8f1f34] flex items-center justify-center text-white text-2xl">
            <FaUser />
          </div>
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Hello User!!
        </h2>
        <p className="text-center text-sm text-[#6c757d] mb-6">
          Create your account for better experience
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 pr-10 font-medium text-sm rounded-md bg-[#f6f7f9] border border-gray-300 focus:outline-none"
            />
            <FiUser className="absolute right-3 top-2.5 text-[#7b7b7c]" />
          </div>

          {/* User Name */}
          <div className="relative">
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 pr-10 font-medium text-sm rounded-md bg-[#f6f7f9] border border-gray-300 focus:outline-none"
            />
            <FiUser className="absolute right-3 top-2.5 text-[#7b7b7c]" />
            {errors.userName && (
              <p className="mt-1 text-red-500 text-xs">{errors.userName}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 pr-10 font-medium text-sm rounded-md bg-[#f6f7f9] border border-gray-300 focus:outline-none"
            />
            <FiMail className="absolute right-3 top-2.5 text-[#7b7b7c]" />
            {errors.email && (
              <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex space-x-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="px-3 py-2 font-medium text-sm rounded-md bg-[#f6f7f9] border border-gray-300 focus:outline-none"
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
            </select>
            <div className="relative flex-1">
              <input
                type="tel"
                name="phone"
                placeholder="10‑digit Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pr-10 font-medium text-sm rounded-md bg-[#f6f7f9] border border-gray-300 focus:outline-none"
              />
              <FiPhone className="absolute right-3 top-2.5 text-[#7b7b7c]" />
            </div>
          </div>
          {errors.phone && (
            <p className="mt-1 text-red-500 text-xs">{errors.phone}</p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 pr-10 font-medium text-sm rounded-md bg-[#f6f7f9] border border-gray-300 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-2.5 text-[#7b7b7c]"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && (
              <p className="mt-1 text-red-500 text-xs">{errors.password}</p>
            )}
            {passwordStrength && !errors.password && (
              <p
                className={`mt-1 text-xs font-semibold ${
                  passwordStrength === "Weak"
                    ? "text-red-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                Strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded mt-2 transform transition duration-200 hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
          >
            CREATE ACCOUNT
          </button>
          {errors.signup && (
            <p className="mt-2 text-center text-red-500 text-sm">
              {errors.signup}
            </p>
          )}
        </form>

        {/* Social & Login Link */}
        <div className="text-center my-4 text-sm text-[#7b7b7c]">
          - OR Continue with -
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <button className="bg-[#efe6e8] border border-[#f83758] p-2 rounded-full shadow-md">
            <FcGoogle size={24} />
          </button>
          <button className="bg-[#efe6e8] border border-[#f83758] p-2 rounded-full shadow-md">
            <FaApple size={24} />
          </button>
          <button className="bg-[#efe6e8] border border-[#f83758] p-2 rounded-full shadow-md text-[#3b5998]">
            <FaFacebookF size={22} />
          </button>
        </div>
        <p className="text-center text-sm">
          I already have an account?{" "}
          <a
            href="/login"
            className="text-[#F83758] font-semibold italic hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
