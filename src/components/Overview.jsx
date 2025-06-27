import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Loading from "../Pages/Loading";
import { ThemeContext } from "../Provider/ThemeContext";
import {
  FaEnvelope,
  FaUser,
  FaStar,
  FaCalendarAlt,
  FaSeedling,
  FaLeaf,
  FaUsers,
  FaUserFriends,
} from "react-icons/fa";

const Overview = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const [stats, setStats] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `https://green-circle-server-indol.vercel.app/dashboard-stats?email=${user.email}`
        );
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      }
    };

    if (user?.email) {
      fetchStats();
    }
  }, [user?.email]);

  if (!stats) return <Loading />;

  return (
    <div
      className={`py-12 min-h-screen ${
        isDark ? "bg-gray-900 text-gray-100" : "text-gray-900"
      }`}
    >
      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`flex flex-col sm:flex-row items-center gap-6 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300
          ${
            isDark
              ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black"
              : "bg-gradient-to-l from-green-100 via-green-200 to-green-300"
          }
        `}
      >
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          loading="lazy"
          className="w-28 h-28 rounded-full object-cover border-4 border-green-500"
        />
        <div className="text-center sm:text-left space-y-2">
          <h2
            className={`text-3xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-green-900"
            }`}
          >
            {user.displayName}
          </h2>

          <div
            className={`flex items-center gap-2 text-base ${
              isDark ? "text-gray-200" : "text-green-900"
            }`}
          >
            <FaEnvelope className="text-green-500" />
            <span>{user.email}</span>
          </div>

          <div
            className={`flex items-center gap-2 text-base ${
              isDark ? "text-gray-200" : "text-green-900"
            }`}
          >
            <FaUser className="text-blue-500" />
            <span>
              Role: <span className="font-medium">Member</span>
            </span>
          </div>

          <div
            className={`flex items-center gap-2 text-base ${
              isDark ? "text-gray-200" : "text-green-900"
            }`}
          >
            <FaStar className="text-yellow-400" />
            <span>
              Account Type: <span className="font-medium">Free</span>
            </span>
          </div>

          <div
            className={`flex items-center gap-2 text-base ${
              isDark ? "text-gray-200" : "text-green-900"
            }`}
          >
            <FaCalendarAlt className="text-pink-500" />
            <span>
              Member Since: <span className="font-medium">2024</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          label="Total Garden Tips"
          count={stats.totalTips}
          color="green"
          isDark={isDark}
          Icon={FaSeedling}
        />
        <StatCard
          label="My Garden Tips"
          count={stats.myTips}
          color="blue"
          isDark={isDark}
          Icon={FaLeaf}
        />
        <StatCard
          label="Total Gardeners"
          count={stats.totalGardeners}
          color="yellow"
          isDark={isDark}
          Icon={FaUsers}
        />
        <StatCard
          label="Total Users"
          count={stats.totalUsers}
          color="purple"
          isDark={isDark}
          Icon={FaUserFriends}
        />
      </div>

      {/* Calendar Section */}
      <div className="mt-12 max-w-xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`p-6 rounded-3xl shadow-xl border transition duration-300 ${
            isDark
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-100 text-gray-900"
          }`}
        >
          <p
            className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
              isDark ? "text-teal-300" : "text-teal-700"
            }`}
          >
            📅 Calendar View
          </p>

          <Calendar
            value={date}
            onChange={setDate}
            className={`w-full rounded-xl overflow-hidden custom-calendar ${
              isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
            }`}
            tileClassName={({ date, view }) =>
              "hover:bg-teal-100 dark:hover:bg-teal-700/30 transition duration-300 cursor-pointer rounded-lg p-1"
            }
            navigationLabel={({ label }) => (
              <div
                className={`text-center font-semibold text-base ${
                  isDark ? "text-teal-300" : "text-teal-700"
                }`}
              >
                {label}
              </div>
            )}
            prevLabel={
              <span
                className={`text-lg font-bold px-2 ${
                  isDark ? "text-teal-300" : "text-teal-700"
                }`}
              >
                ‹
              </span>
            }
            nextLabel={
              <span
                className={`text-lg font-bold px-2 ${
                  isDark ? "text-teal-300" : "text-teal-700"
                }`}
              >
                ›
              </span>
            }
          />

          <p
            className={`text-center mt-4 text-sm ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Selected Date:{" "}
            <span className="font-semibold">{date.toLocaleDateString()}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ label, count, color, isDark, Icon }) => {
  const colors = {
    green: {
      light: "from-green-400 to-green-600",
      dark: "from-green-600 to-green-800",
    },
    blue: {
      light: "from-blue-400 to-blue-600",
      dark: "from-blue-600 to-blue-800",
    },
    yellow: {
      light: "from-yellow-400 to-yellow-500",
      dark: "from-yellow-600 to-yellow-700",
    },
    purple: {
      light: "from-purple-400 to-purple-600",
      dark: "from-purple-600 to-purple-800",
    },
  };

  const bgGradient = isDark ? colors[color].dark : colors[color].light;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br ${bgGradient} text-white p-7 rounded-3xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center`}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-white w-6 h-6" />}
        <p className="text-sm font-semibold opacity-90 tracking-wide uppercase">
          {label}
        </p>
      </div>
      <p className="text-4xl font-extrabold mt-3 tracking-tight">{count}</p>
    </motion.div>
  );
};

export default Overview;