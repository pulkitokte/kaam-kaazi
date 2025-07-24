// components/IndividualProfile.jsx
import React, { useState } from "react";
import { FaUserCircle, FaPen } from "react-icons/fa";

export default function IndividualProfile() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#EF2C4A] flex items-center justify-center px-4 py-8">
      <div className="bg-[#D9D9D9] p-8 rounded-2xl w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-8">PROFILE DETAILS</h2>

        {/* Profile Photo */}
        <div className="flex flex-col items-start sm:items-center sm:flex-row gap-4 mb-8">
          <div className="text-left sm:text-center">
            <label className="font-semibold mb-1 block">PROFILE PHOTO</label>
            <div className="relative">
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="profile-upload" className="cursor-pointer">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-6xl text-black" />
                )}
              </label>
            </div>
            <label
              htmlFor="profile-upload"
              className="text-sm flex items-center gap-1 mt-2 cursor-pointer"
            >
              Click on icon to update photo <FaPen size={12} />
            </label>
          </div>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: "FIRST NAME",
              type: "text",
              placeholder: "Enter your first name",
            },
            {
              label: "USERNAME",
              type: "text",
              placeholder: "Enter your username",
            },
            { label: "EMAIL", type: "email", placeholder: "Enter your email" },
            {
              label: "MOBILE NUMBER",
              type: "tel",
              placeholder: "Enter your mobile number",
            },
            {
              label: "ADDRESS",
              type: "text",
              placeholder: "Enter your address",
            },
            {
              label: "ANY LANDMARK (OPTIONAL)",
              type: "text",
              placeholder: "Any landmark (optional)",
            },
            { label: "CITY", type: "text", placeholder: "City" },
            { label: "PINCODE", type: "text", placeholder: "Pincode" },
          ].map(({ label, type, placeholder }) => (
            <div key={label}>
              <label className="block text-xs font-semibold mb-1">
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                className="w-full p-2 rounded bg-white text-sm"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold mb-1">
              PAYMENT METHOD
            </label>
            <select className="w-full p-2 rounded bg-white text-sm">
              <option>Choose your payment method</option>
              <option>Cash</option>
              <option>Card</option>
              <option>UPI</option>
              <option>Net Banking</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">HISTORY</label>
            <select className="w-full p-2 rounded bg-white text-sm">
              <option>Check your history</option>
              <option>Previous Orders</option>
              <option>Payments</option>
              <option>Service Logs</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
