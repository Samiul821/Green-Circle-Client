import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TipRow = ({ tip, isDark }) => {
  const { _id, title, category, image } = tip;

  return (
    <motion.tr
      variants={rowVariants}
      whileHover={{
        scale: 1.02,
        backgroundColor: isDark
          ? "rgba(34, 197, 94, 0.3)" // Tailwind green-500 with opacity for dark
          : "rgba(220, 252, 231, 0.6)", // original light hover color
      }}
      className={`border-b cursor-pointer transition-colors duration-200 ${
        isDark ? "border-green-700" : "border-green-200"
      }`}
    >
      <td
        className={`px-6 py-4 whitespace-nowrap font-medium font-serif ${
          isDark ? "text-green-300" : "text-green-900"
        }`}
      >
        {title}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap font-medium ${
          isDark ? "text-green-400" : "text-green-700"
        }`}
      >
        {category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-20 h-20 object-cover rounded-lg"
          />
        ) : (
          <div
            className={`w-20 h-20 rounded-lg flex items-center justify-center font-serif ${
              isDark
                ? "bg-green-900 text-green-600"
                : "bg-green-100 text-green-400"
            }`}
          >
            No Image
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link
          to={`/tipDetails/${_id}`}
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition"
        >
          See More
        </Link>
      </td>
    </motion.tr>
  );
};

export default TipRow;
