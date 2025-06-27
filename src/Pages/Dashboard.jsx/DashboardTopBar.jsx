import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaTachometerAlt,
  FaBell,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeContext";

const DashboardTopBar = ({ user }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={`hidden md:flex justify-between items-center px-6 py-4 rounded-xl shadow-sm mt-3  transition-all duration-300 ${
        isDark ? "bg-gray-800" : "bg-green-600"
      }`}
    >
      {/* Left: Home, About, Contact Us icons */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          title="Home"
          className={`rounded-full p-3 text-lg transition-all duration-200 ${
            isDark
              ? "bg-gray-700 text-green-400 hover:bg-green-700"
              : "bg-white text-green-700 hover:bg-green-100"
          }`}
        >
          <FaHome />
        </Link>
        <button
          title="About"
          className={`rounded-full p-3 text-lg transition-all duration-200 ${
            isDark
              ? "bg-gray-700 text-green-400 hover:bg-green-700"
              : "bg-white text-green-700 hover:bg-green-100"
          }`}
        >
          <FaInfoCircle />
        </button>
        <button
          title="Contact Us"
          className={`rounded-full p-3 text-lg transition-all duration-200 ${
            isDark
              ? "bg-gray-700 text-green-400 hover:bg-green-700"
              : "bg-white text-green-700 hover:bg-green-100"
          }`}
        >
          <FaEnvelope />
        </button>
      </div>

      {/* Center: Dashboard Icon */}
      <Link to="/dashboard" className="flex items-center gap-2">
        <FaTachometerAlt
          className={`text-2xl ${isDark ? "text-green-400" : "text-white"}`}
        />
        <span
          className={`font-bold text-xl ${
            isDark ? "text-white" : "text-white"
          }`}
        >
          Dashboard
        </span>
      </Link>

      {/* Right: User Info */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p
            className={`text-sm font-semibold ${
              isDark ? "text-white" : "text-white"
            }`}
          >
            {user?.displayName}
          </p>
          <p
            className={`text-xs ${isDark ? "text-green-300" : "text-gray-200"}`}
          >
            {user?.email}
          </p>
        </div>

        <button
          className={`rounded-full p-3 text-lg transition ${
            isDark
              ? "bg-gray-700 text-yellow-400 hover:bg-yellow-600"
              : "bg-white text-yellow-700 hover:bg-yellow-100"
          }`}
          title="Notifications"
        >
          <FaBell />
        </button>

        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="avatar"
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
        />
      </div>
    </div>
  );
};

export default DashboardTopBar;
