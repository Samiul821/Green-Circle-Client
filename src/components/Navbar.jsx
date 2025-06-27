import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "../Provider/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { user, logOut, loading } = useContext(AuthContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Theme context থেকে data নাও
  const { isDark, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6 bg-green-600">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
      </div>
    );
  }

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((error) => toast.error("Logout error:", error.message));
  };

  return (
    <nav
      className={`w-full shadow-md fixed z-50 ${
        isDark ? "bg-gray-900 text-white" : "bg-green-600 text-white"
      }`}
    >
      <div className="px-[5%] lg:px-[10%] py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-3xl font-extrabold tracking-tight flex items-center gap-1"
        >
          <span
            className={`transition duration-200 hover:text-yellow-300 ${
              isDark ? "text-white" : ""
            }`}
          >
            Green
          </span>
          <span className={isDark ? "text-green-600" : "text-yellow-400"}>
            Circle
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 lg:gap-10 font-semibold text-[17px] items-center">
          {[
            { to: "/", label: "Home" },
            { to: "/explore", label: "Explore" },
            { to: "/browserTips", label: "Browser Tips" },
            ...(user
              ? [
                  { to: "/gardentip", label: "Share a Tip" },
                  { to: "/mytips", label: "My Tips" },
                ]
              : []),
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => {
                  let baseClasses =
                    "hover:text-yellow-200 transition duration-200";
                  let darkClass = isDark ? "text-gray-300" : "";
                  let activeClass = "";

                  if (isActive) {
                    activeClass = isDark
                      ? "text-green-300 font-bold"
                      : "text-green-600 font-bold";
                  }

                  return `${baseClasses} ${darkClass} ${activeClass}`;
                }}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="text-white text-2xl ml-4"
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4 relative">
          {user ? (
            <>
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-green-500 object-cover shadow-md cursor-pointer transition duration-200 hover:scale-105"
                onClick={() => setShowDropdown(!showDropdown)}
                data-tooltip-id="profile-tooltip"
                data-tooltip-content={user.displayName}
              />
              <Tooltip id="profile-tooltip" place="top" />

              {/* Dropdown */}
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className={`absolute top-12 right-0 rounded-xl shadow-lg w-44 z-50 overflow-hidden animate-fadeIn ${
                    isDark
                      ? "bg-gray-800 border border-gray-700 text-white"
                      : "bg-white border border-gray-200 text-gray-700"
                  }`}
                >
                  <div
                    className={`px-4 py-3 border-b ${
                      isDark
                        ? "bg-gray-900 border-gray-700"
                        : "bg-green-50 border-green-100"
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold truncate ${
                        isDark ? "text-green-400" : "text-green-700"
                      }`}
                    >
                      {user.displayName}
                    </p>
                  </div>
                  <Link
                    to="/dashboard"
                    className={`block w-full px-4 py-2 text-sm transition ${
                      isDark
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-green-100"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 text-sm transition ${
                      isDark
                        ? "text-red-400 hover:bg-red-700 hover:text-red-300"
                        : "text-red-600 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <NavLink
              to="/auth/login"
              className="
                inline-block
                bg-green-100
                text-green-800
                font-semibold
                px-6
                py-2.5
                rounded-md
                tracking-wide
                shadow-sm
                hover:bg-green-200
                focus:outline-none
                focus:ring-2
                focus:ring-green-400
                focus:ring-opacity-50
                transition
                duration-200
                ease-in-out
              "
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Icon */}
        <button className="md:hidden text-3xl" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-500 px-6 pb-6 pt-4 space-y-4 font-medium text-white">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className="block hover:text-yellow-200"
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            onClick={toggleMenu}
            className="block hover:text-yellow-200"
          >
            Explore
          </NavLink>
          <NavLink
            to="/browserTips"
            onClick={toggleMenu}
            className="block hover:text-yellow-200"
          >
            Browser Tips
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/gardentip"
                onClick={toggleMenu}
                className="block hover:text-yellow-200"
              >
                Share a Tip
              </NavLink>
              <NavLink
                to="/mytips"
                onClick={toggleMenu}
                className="block hover:text-yellow-200"
              >
                My Tips
              </NavLink>

              {/* এখানে Dashboard লিংক যোগ করো */}
              <NavLink
                to="/dashboard"
                onClick={toggleMenu}
                className="block hover:text-yellow-200"
              >
                Dashboard
              </NavLink>
            </>
          )}

          {user ? (
            <button
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
              className="w-full bg-white text-green-600 hover:bg-green-100 py-2 rounded-full font-semibold transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth/login"
              onClick={toggleMenu}
              className="block text-center bg-white text-green-600 hover:bg-green-100 py-2 rounded-full font-semibold transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
