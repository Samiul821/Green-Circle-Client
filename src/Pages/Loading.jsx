import React from "react";
import { motion } from "framer-motion";
import { FaLeaf } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-white">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinning Circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-20 h-20 border-t-4 border-b-4 border-green-500 rounded-full"
        ></motion.div>

        {/* Leaf bouncing */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <FaLeaf className="text-green-600 text-3xl" />
        </motion.div>

        {/* Text */}
        <p className="text-xl playfair font-semibold text-green-800 animate-pulse">
          Loading Green Circle...
        </p>
      </div>
    </div>
  );
};

export default Loading;
