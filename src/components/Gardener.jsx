import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../Provider/ThemeContext";

const Gardener = ({ gardener }) => {
  const {
    name,
    age,
    gender,
    status,
    experiences,
    image,
    totalSharedTips,
    otherInfo,
  } = gardener;

  const { isDark } = useContext(ThemeContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.03,
        boxShadow: isDark
          ? "0 10px 25px rgba(255, 255, 255, 0.1)"
          : "0 10px 25px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        rounded-3xl overflow-hidden border transition-colors duration-300
        ${
          isDark
            ? "border-gray-700 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200"
            : "border-green-100 bg-gradient-to-br from-white via-green-50 to-lime-100 text-green-900"
        }
      `}
    >
      {/* Top Image Section */}
      <div className="relative h-48 bg-green-100 dark:bg-gray-700">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-5 z-10">
          <h2 className={`text-xl font-bold tracking-wide ${isDark ? "text-gray-200" : "text-white"}`}>
            {name}
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-white/90"} text-sm`}>
            {gender}, {age} yrs
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className={`p-5 space-y-2`}>
        <div className={`flex justify-between text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-700"}`}>
          <span>
            Status:{" "}
            <span className={isDark ? "font-semibold text-gray-200" : "font-semibold text-green-700"}>
              {status}
            </span>
          </span>
          <span>
            Tips:{" "}
            <span className={isDark ? "font-semibold text-gray-200" : "font-semibold text-green-700"}>
              {totalSharedTips}
            </span>
          </span>
        </div>

        <p className={isDark ? "text-gray-300" : "text-gray-800"}>
          Experience: <span className="font-semibold">{experiences}</span>
        </p>

        {otherInfo && (
          <p className={`text-xs italic mt-3 border-t pt-3 leading-snug
            ${isDark ? "text-gray-400 border-gray-700" : "text-green-700 border-green-100"}
          `}>
            {otherInfo}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Gardener;
