import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Pages/Loading";

const Overview = () => {
  const { user } = useContext(AuthContext);
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
    <div className="py-4 lg:px-[5%]">
      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-6 bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
      >
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-green-500"
          loading="lazy"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-semibold text-gray-900">
            {user.displayName}
          </h2>
          <p className="text-gray-600 mt-1 text-base">{user.email}</p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          label="Total Garden Tips"
          count={stats.totalTips}
          color="green"
        />
        <StatCard label="My Garden Tips" count={stats.myTips} color="blue" />
        <StatCard
          label="Total Gardeners"
          count={stats.totalGardeners}
          color="yellow"
        />
        <StatCard label="Total Users" count={stats.totalUsers} color="purple" />
      </div>
    </div>
  );
};

const StatCard = ({ label, count, color }) => {
  const colors = {
    green: "from-green-400 to-green-600",
    blue: "from-blue-400 to-blue-600",
    yellow: "from-yellow-400 to-yellow-500",
    purple: "from-purple-400 to-purple-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br ${colors[color]} text-white p-7 rounded-3xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center`}
    >
      <p className="text-sm font-semibold opacity-90 tracking-wide uppercase">
        {label}
      </p>
      <p className="text-4xl font-extrabold mt-3 tracking-tight">{count}</p>
    </motion.div>
  );
};

export default Overview;
