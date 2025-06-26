import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { use, useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { logOut } = use(AuthContext);
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

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

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="relative min-h-screen md:flex bg-green-100">
      {/* Left Side: Sidebar Component */}
      <div className="bg-green-600 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer px-3 py-2 font-bold">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center gap-1 px-3 py-2 text-2xl md:text-3xl font-bold tracking-tight"
            >
              <span className="text-white hover:text-yellow-400 transition duration-200">
                Green
              </span>
              <span className="text-yellow-400">Circle</span>
            </NavLink>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-3 rounded-md hover:bg-green-700 focus:outline-none transition duration-200"
        >
          <AiOutlineBars className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden w-64 space-y-4 px-0 py-0 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out bg-green-50`}
      >
        {/* Logo Section with green-600 */}
        <div className="bg-green-600 px-4 py-3 shadow-md">
          <NavLink
            to="/"
            className="flex items-center gap-1 text-2xl md:text-3xl font-bold tracking-tight"
          >
            <span className="text-white hover:text-yellow-400 transition duration-200">
              Green
            </span>
            <span className="text-yellow-400">Circle</span>
          </NavLink>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col justify-between flex-1 px-3 ">
          <ul className="space-y-3">
            {" "}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                    isActive
                      ? "bg-green-600 text-[#606060] font-bold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-black"
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
                  `block px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                    isActive
                      ? "bg-green-600 text-white font-bold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-black"
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
                  `block px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                    isActive
                      ? "bg-green-600 text-white font-bold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-black"
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
                  `block px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                    isActive
                      ? "bg-green-600 text-white font-bold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-black"
                  }`
                }
              >
                My Items
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Footer Items */}
        <div className="px-3 mb-4">
          <hr className="mb-2 border-gray-300" />

          <NavLink
            to="profile"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200 hover:text-black"
              }`
            }
          >
            Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-4 text-gray-600 hover:bg-gray-300 hover:text-black transition duration-200 rounded-lg"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 md:max-w-[72%] lg:max-w-full md:ml-64">
        <div className="p-5">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
