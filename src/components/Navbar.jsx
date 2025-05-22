import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Tooltip } from 'react-tooltip'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { user, logOut, loading } = useContext(AuthContext);

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
    <nav className="bg-green-600 text-white w-full shadow-md">
      <div className="px-4 md:px-10 lg:px-24 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-3xl font-extrabold tracking-tight flex items-center gap-1"
        >
          <span className="hover:text-yellow-300 transition duration-200">
            🌿 Green
          </span>
          <span className="text-yellow-400">Circle</span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 lg:gap-10 font-semibold text-[17px] items-center">
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
              to="/explore"
              className="hover:text-yellow-200 transition duration-200"
            >
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browserTips"
              className="hover:text-yellow-200 transition duration-200"
            >
              Browser Tips
            </NavLink>
          </li>
          {user && (
            <>
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
                  to="/mytips"
                  className="hover:text-yellow-200 transition duration-200"
                >
                  My Tips
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <>
             <img
              src={user.photoURL}
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-white object-cover"
              data-tooltip-id="profile-tooltip"
              data-tooltip-content={user.displayName}
            />
            <Tooltip id="profile-tooltip" place="top" />
            </>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-white text-green-600 hover:bg-green-100 px-5 py-2 rounded-full shadow font-semibold transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/auth/login"
              className="bg-white text-green-600 hover:bg-green-100 px-5 py-2 rounded-full shadow font-semibold transition"
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
