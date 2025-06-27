import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { logOut } = useContext(AuthContext);
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

  // ✅ Sidebar Content
  const sidebarContent = (
    <div className="flex flex-col justify-between h-full w-64 bg-gradient-to-tr from-green-100 via-green-50 to-green-200 shadow-lg z-50">
      {/* Logo */}
      <div className="bg-green-600 px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold flex gap-1">
          <span className="text-white hover:text-yellow-400 transition">
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
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-green-600 text-white font-bold"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-green-600 text-white font-bold"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              Overview
            </NavLink>
          </li>

          <li>
            <NavLink
              to="all-tips"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-green-600 text-white font-bold"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              All Garden Tips
            </NavLink>
          </li>

          <li>
            <NavLink
              to="my-items"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-green-600 text-white font-bold"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              My Items
            </NavLink>
          </li>
        </ul>
      </div>
      <hr />
      {/* Footer */}
      <div className="px-3 mb-4">
        <ul className="mt-4 space-y-3 px-3 mb-4">
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              Profile
            </NavLink>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-300 transition"
            >
              <GrLogout className="w-5 h-5" />
              <span className="ml-2 font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-green-100">
      {/* ✅ Topbar (sm & md only) */}
      <div className="bg-green-600 text-white flex justify-between items-center px-4 py-3 lg:hidden">
        <NavLink
          to="/"
          className="text-2xl font-bold tracking-tight flex gap-1"
        >
          <span className="text-white hover:text-yellow-400 transition">
            Green
          </span>
          <span className="text-yellow-400">Circle</span>
        </NavLink>
        <button
          onClick={toggleDrawer}
          className="p-2 rounded-md hover:bg-green-700 transition"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* ✅ Mobile Drawer Sidebar with smooth animation */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-50 shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>

      {/* ✅ Backdrop when Drawer is open */}
      {isDrawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 z-40 lg:hidden"
        ></div>
      )}

      {/* ✅ Desktop Sidebar (lg+) */}
      <div className="hidden lg:flex fixed flex-col justify-between w-64 inset-y-0 left-0 bg-green-50 shadow-md z-10">
        {sidebarContent}
      </div>

      {/* ✅ Main Content Area */}
      <div className="flex-1 lg:ml-64 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
