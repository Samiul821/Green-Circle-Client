import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-green-600 text-white  w-full  shadow-md">
      <div className="px-4 md:px-10 lg:px-[100px] py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-tight">
          <NavLink to="/" className="flex raleway items-center gap-1">
            <span className="hover:text-yellow-300 transition duration-200">
              🌿 Green
            </span>
            <span className="text-yellow-400">Circle</span>
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex raleway gap-8 font-semibold text-white text-[17px]">
          <li>
            <NavLink
              to="/"
              className="hover:text-yellow-200 transition duration-200"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gardentip"
              className="hover:text-yellow-200 transition duration-200"
            >
              Share a Tip
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore"
              className="hover:text-yellow-200 transition duration-200"
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mytips"
              className="hover:text-yellow-200 transition duration-200"
            >
              My Tips
            </NavLink>
          </li>
        </ul>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <NavLink
            to="/auth/login"
            className="bg-white text-green-600 hover:bg-green-100 px-5 py-2 rounded-full shadow font-semibold raleway transition duration-200"
          >
            Login
          </NavLink>
        </div>

        {/* Mobile Icon */}
        <button className="md:hidden text-3xl text-white" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-500 px-6 pb-6 pt-4 space-y-4 text-base font-medium text-white transition-all">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className="block hover:text-yellow-200 transition"
          >
            Home
          </NavLink>
          <NavLink
            to="/gardentip"
            onClick={toggleMenu}
            className="block hover:text-yellow-200 transition"
          >
            Share a Tip
          </NavLink>
          <NavLink
            to="/explore"
            onClick={toggleMenu}
            className="block hover:text-yellow-200 transition"
          >
            Explore
          </NavLink>
          <NavLink
            to="/mytips"
            onClick={toggleMenu}
            className="block hover:text-yellow-200 transition"
          >
            My Tips
          </NavLink>
          <NavLink
            to="/auth/login"
            onClick={toggleMenu}
            className="block text-center mt-2 bg-white text-green-600 hover:bg-green-100 py-2 rounded-full font-semibold transition"
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
