import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../Provider/ThemeContext";

const TopTrending = () => {
  const [tips, setTips] = useState([]);
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    fetch("https://green-circle-server-indol.vercel.app/top-liked")
      .then((res) => res.json())
      .then((data) => setTips(data));
  }, []);

  return (
    <div>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className={`text-4xl font-bold playfair bg-clip-text text-transparent
            ${
              isDark
                ? "bg-gradient-to-r from-green-300 to-lime-400"
                : "bg-gradient-to-r from-green-700 to-lime-400"
            }
          `}
        >
          🍀 Trending Garden Tips
        </h2>
        <p
          className={`nunito mt-2 ${
            isDark ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Loved by nature enthusiasts
        </p>
      </motion.div>

      {tips.length === 0 ? (
        <p
          className={`text-center ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Loading tips...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {tips.map((tip, index) => (
            <motion.div
              key={tip._id}
              className={`relative p-5 pt-16 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
                ${
                  isDark
                    ? "bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-100 border border-gray-700"
                    : "bg-gradient-to-br from-green-50 to-lime-100 text-green-900 border border-green-200"
                }
              `}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white`}
              >
                <img
                  src={
                    tip.image || "https://via.placeholder.com/150x150?text=Tip"
                  }
                  alt={tip.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-xl raleway font-semibold mb-2">
                  {tip.title}
                </h3>
                <p className="nunito text-sm mb-4 line-clamp-3">
                  {tip.description || "No description provided."}
                </p>
                <div className="flex justify-center gap-4 text-sm font-medium">
                  <span
                    className={`${isDark ? "text-red-400" : "text-red-600"}`}
                  >
                    ❤️ {tip.likes}
                  </span>
                  <span
                    className={`${
                      isDark ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    🌿 Tip #{index + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopTrending;
