import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";

import Loading from "../Pages/Loading";
import { ThemeContext } from "../Provider/ThemeContext";

const Overview = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const [stats, setStats] = useState(null);

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

    fetchStats();
  }, [user.email]);

  if (!stats) return <Loading />;

  return (
    <div
      className={`py-4 lg:px-[5%] min-h-screen ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`flex flex-col sm:flex-row items-center gap-6 p-8 rounded-3xl shadow-lg border
          ${
            isDark
              ? "bg-gray-800 border-gray-700 text-gray-100"
              : "bg-white border-gray-100 text-gray-900"
          }`}
      >
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          loading="lazy"
          className="w-28 h-28 rounded-full object-cover border-4 border-green-500"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-semibold">{user.displayName}</h2>
          <p
            className={`mt-1 text-base ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {user.email}
          </p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          label="Total Garden Tips"
          count={stats.totalTips}
          color="green"
          isDark={isDark}
        />
        <StatCard
          label="My Garden Tips"
          count={stats.myTips}
          color="blue"
          isDark={isDark}
        />
        <StatCard
          label="Total Gardeners"
          count={stats.totalGardeners}
          color="yellow"
          isDark={isDark}
        />
        <StatCard
          label="Total Users"
          count={stats.totalUsers}
          color="purple"
          isDark={isDark}
        />
      </div>
    </div>
  );
};

const StatCard = ({ label, count, color, isDark }) => {
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
      <p className="text-sm font-semibold opacity-90 tracking-wide uppercase">
        {label}
      </p>
      <p className="text-4xl font-extrabold mt-3 tracking-tight">{count}</p>
    </motion.div>
  );
};

export default Overview;
