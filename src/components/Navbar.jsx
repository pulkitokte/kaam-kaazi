import React from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Navbar() {
  return (
    <header className="bg-[#E63946] text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-lg font-bold tracking-wide">Kaam Kaazi</h1>

        {/* Right Icons*/}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <button className="text-white hover:text-gray-200">
            <FiSearch size={20} />
          </button>
          {/* Notification Icon*/}
          <button className="text-white hover:text-gray-200 relative">
            <IoMdNotificationsOutline size={22} />
            {/* Optional: Notification dot */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-300 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
