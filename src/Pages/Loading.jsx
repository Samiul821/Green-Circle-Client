import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";
import { ThemeContext } from "../Provider/ThemeContext";

const Loading = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-green-50"
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Spinning Circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className={`w-20 h-20 rounded-full border-t-4 border-b-4 ${
            isDark ? "border-green-400" : "border-green-500"
          }`}
        ></motion.div>

        {/* Leaf bouncing */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <FaLeaf
            className={`text-3xl ${
              isDark ? "text-green-400" : "text-green-600"
            }`}
          />
        </motion.div>

        {/* Text */}
        <p
          className={`text-xl playfair font-semibold animate-pulse ${
            isDark ? "text-green-400" : "text-green-800"
          }`}
        >
          Loading Green Circle...
        </p>
      </div>
    </div>
  );
};

export default Loading;
