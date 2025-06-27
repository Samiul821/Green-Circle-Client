import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GrLogout } from "react-icons/gr";
import {
  AiOutlineBars,
  AiOutlineHome,
  AiOutlineDashboard,
} from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { GiPlantRoots } from "react-icons/gi";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeContext";
import { toast } from "react-toastify";
import DashboardTopBar from "../Pages/Dashboard.jsx/DashboardTopBar";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        toast.error("Failed to log out. Please try again.");
        console.error("Logout error:", error);
      });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const ThemeToggleSwitch = () => (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`ml-2 px-3 py-1 rounded-full font-semibold focus:outline-none transition
        ${
          isDark
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-green-300 text-green-900 hover:bg-green-400"
        }
      `}
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );

  const sidebarContent = (
    <div
      className={`flex flex-col justify-between h-full w-64 shadow-lg z-50 ${
        isDark
          ? "bg-gray-900 text-gray-300"
          : "bg-gradient-to-tr from-green-100 via-green-50 to-green-200 text-gray-800"
      }`}
    >
      {/* Logo & Close button */}
      <div
        className={`px-4 py-3 flex justify-between items-center ${
          isDark ? "bg-gray-800" : "bg-green-600"
        }`}
      >
        <NavLink to="/" className="text-2xl font-bold flex gap-1">
          <span
            className={`${
              isDark
                ? "text-green-400 hover:text-yellow-400"
                : "text-white hover:text-yellow-400"
            } transition`}
          >
            Green
          </span>
          <span className="text-yellow-400">Circle</span>
        </NavLink>
        <button className="lg:hidden text-white" onClick={toggleDrawer}>
          <IoMdClose size={24} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4">
        <ul className="space-y-3">
          {[
            {
              to: "/",
              label: "Home",
              icon: <AiOutlineHome className="w-5 h-5" />,
            },
            {
              to: "/dashboard",
              label: "Overview",
              icon: <AiOutlineDashboard className="w-5 h-5" />,
            },
            {
              to: "all-tips",
              label: "All Garden Tips",
              icon: <GiPlantRoots className="w-5 h-5" />,
            },
            {
              to: "my-items",
              label: "My Items",
              icon: <MdOutlineInventory2 className="w-5 h-5" />,
            },
          ].map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                    isActive
                      ? isDark
                        ? "bg-green-700 text-white font-bold"
                        : "bg-green-600 text-white font-bold"
                      : isDark
                      ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                {icon}
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Theme Toggle */}
      <div className="px-3 mb-4">
        <ThemeToggleSwitch />
      </div>

      <hr className={isDark ? "border-gray-700" : "border-green-300"} />

      {/* Footer */}
      <div className="px-3 mb-4">
        <ul className="mt-4 space-y-3 px-3 mb-4">
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? isDark
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white"
                    : isDark
                    ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              <FaUserCircle className="w-5 h-5" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg font-medium transition ${
                isDark
                  ? "text-gray-400 hover:bg-red-700 hover:text-red-400"
                  : "text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <GrLogout className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div
      className={`${
        isDark ? "bg-gray-900 text-gray-300" : "bg-green-100 text-gray-800"
      } relative min-h-screen`}
    >
      {/* Topbar for small devices */}
      <div
        className={`flex justify-between items-center px-4 py-3 lg:hidden ${
          isDark ? "bg-gray-800 text-gray-300" : "bg-green-600 text-white"
        }`}
      >
        <NavLink
          to="/"
          className="text-2xl font-bold tracking-tight flex gap-1"
        >
          <span
            className={`${
              isDark ? "text-green-400" : "text-white hover:text-yellow-400"
            }`}
          >
            Green
          </span>
          <span className="text-yellow-400">Circle</span>
        </NavLink>
        <button
          onClick={toggleDrawer}
          className={`p-2 rounded-md transition ${
            isDark ? "hover:bg-gray-700" : "hover:bg-green-700"
          }`}
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isDark ? "bg-gray-900 text-gray-300" : "bg-green-50 text-gray-800"
        }`}
      >
        {sidebarContent}
      </div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <div onClick={toggleDrawer} className="fixed inset-0 z-40 lg:hidden" />
      )}

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex fixed flex-col justify-between w-64 inset-y-0 left-0 shadow-md z-10 ${
          isDark ? "bg-gray-900 text-gray-300" : "bg-green-50 text-gray-800"
        }`}
      >
        {sidebarContent}
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 lg:px-[5%] lg:ml-64 p-5 transition-colors duration-300 ${
          isDark ? "bg-gray-900 text-gray-300" : "bg-green-100 text-gray-800"
        }`}
      >
        <DashboardTopBar user={user}></DashboardTopBar>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
