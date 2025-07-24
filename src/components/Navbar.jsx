// components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setNotificationOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    const profileType = localStorage.getItem("profileType");
    if (profileType === "individual") {
      navigate("/individual-profile");
    } else if (profileType === "business") {
      navigate("/business-profile");
    } else {
      navigate("/complete-profile");
    }
    setProfileOpen(false);
  };

  return (
    <header className="bg-[#E63946] text-white px-4 py-3 shadow-md relative z-50">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-lg font-bold tracking-wide">Kaam Kaazi</h1>

        {/* Icons */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          {/* Search */}
          <button className="text-white hover:text-gray-200">
            <FiSearch size={20} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setProfileOpen(false);
              }}
              className="relative text-white hover:text-gray-200"
            >
              <IoMdNotificationsOutline size={22} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></span>
            </button>
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg z-50">
                <ul className="text-sm divide-y divide-gray-200">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    Plumber service booked
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    New cleaning offer available
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    AC cleaning scheduled
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationOpen(false);
              }}
              className="text-white hover:text-gray-200"
            >
              <FaUserCircle size={24} />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                <ul className="text-sm divide-y divide-gray-200">
                  <li
                    onClick={handleProfileClick}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    View Profile
                  </li>
                  <li
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/history");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    History
                  </li>
                  <li
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
