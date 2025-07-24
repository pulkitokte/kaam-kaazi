// pages/BusinessProfile.jsx
import React from "react";
import { FaBuilding, FaPen } from "react-icons/fa";

export default function BusinessProfile() {
  return (
    <div className="min-h-screen bg-[#f83758] flex justify-center items-center font-worksans px-4">
      <div className="bg-gray-200 rounded-2xl shadow-lg p-8 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-8">
          BUSINESS PROFILE
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Business Logo */}
          <div className="flex flex-col items-center justify-center bg-gray-300 rounded-xl p-6 w-full lg:w-1/2">
            <p className="font-semibold mb-2">BUSINESS LOGO</p>
            <FaBuilding className="text-6xl mb-2" />
            <button className="flex items-center gap-2 text-sm text-black hover:underline">
              Click to upload logo <FaPen />
            </button>
          </div>

          {/* Right: Business Details */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Business Name</label>
              <input
                type="text"
                placeholder="Enter your business name"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Owner Name</label>
              <input
                type="text"
                placeholder="Enter Owner's full name"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your mail"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium">City</label>
              <input
                type="text"
                placeholder="Enter your city"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Pincode</label>
              <input
                type="text"
                placeholder="Pincode"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium">License Number</label>
              <input
                type="text"
                placeholder="Enter your Registration/License"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Payment Method Accepted
              </label>
              <select className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none">
                <option>Select Payment Method</option>
                <option>UPI</option>
                <option>Cash</option>
                <option>Card</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Business Experience</label>
              <input
                type="text"
                placeholder="e.g. 5 years"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
