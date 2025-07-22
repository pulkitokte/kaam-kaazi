import React from "react";
import { FaSearch, FaCloud, FaChevronLeft } from "react-icons/fa";

export default function ProfileChoice() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f83758] font-worksans px-4">
      <div className="bg-white rounded-md shadow-md p-8 w-full max-w-md">
        {/* Arrow + Title */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => window.history.back()}
            className="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-200 hover:shadow"
          >
            <FaChevronLeft className="text-gray-800" />
          </button>
          <h2 className="ml-4 text-lg font-semibold text-gray-800">
            Complete your profile
          </h2>
        </div>

        <p className="text-left mb-4 font-medium text-sm">I wanted to:</p>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between bg-[#f88a9e] hover:bg-[#f7718b] text-white text-sm font-semibold py-3 px-4 rounded-md transition">
            <span className="flex items-center gap-2">
              <FaSearch />I am an Individual / Service seeker
            </span>
            <span>&gt;</span>
          </button>

          <button className="w-full flex items-center justify-between bg-[#f88a9e] hover:bg-[#f7718b] text-white text-sm font-semibold py-3 px-4 rounded-md transition">
            <span className="flex items-center gap-2">
              <FaCloud />I am Business / Service provider
            </span>
            <span>&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
