import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../Provider/ThemeContext";

const ExploreGardenes = ({ gardener }) => {
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
      whileHover={{
        scale: 1.06,
        boxShadow: isDark
          ? "0 20px 30px rgba(255,255,255,0.1)"
          : "0 20px 30px rgba(16, 185, 129, 0.3)",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        rounded-3xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer flex flex-col transition-all duration-300
        ${
          isDark
            ? "bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-100"
            : "bg-gradient-to-br from-white via-green-50 to-lime-100 text-green-900"
        }
      `}
    >
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden rounded-t-3xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-110"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-2xl font-bold drop-shadow-md">
            {name}
          </h3>
          <p className="text-green-200 text-sm">{status}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between mb-3 font-semibold text-sm">
          <span className={isDark ? "text-gray-300" : "text-green-700"}>
            Age: {age}
          </span>
          <span className={isDark ? "text-gray-300" : "text-green-700"}>
            Gender: {gender}
          </span>
        </div>

        <div className="flex-grow mb-4">
          <h4
            className={`font-semibold mb-2 ${
              isDark ? "text-gray-100" : "text-green-800"
            }`}
          >
            Experiences
          </h4>
          <ul
            className={`list-disc list-inside max-h-28 overflow-y-auto text-sm space-y-1
            ${isDark ? "text-gray-300" : "text-green-700"}`}
          >
            {Array.isArray(experiences) ? (
              experiences.map((exp, idx) => <li key={idx}>{exp}</li>)
            ) : (
              <li>{experiences}</li>
            )}
          </ul>
        </div>

        <p
          className={`${
            isDark ? "text-gray-300" : "text-green-600"
          } font-medium mb-1`}
        >
          🌿 Shared Tips:{" "}
          <span className={isDark ? "text-white" : "text-green-800"}>
            {totalSharedTips}
          </span>
        </p>

        {otherInfo && (
          <p
            className={`italic text-xs mt-1 line-clamp-3
            ${isDark ? "text-gray-400" : "text-green-500"}`}
          >
            “{otherInfo}”
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ExploreGardenes;
