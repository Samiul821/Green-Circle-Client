import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TipRow = ({ tip }) => {
  const { _id, title, category, image } = tip;

  return (
    <motion.tr
      variants={rowVariants}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(220, 252, 231, 0.6)" }}
      className="border-b border-green-200 cursor-pointer transition-colors duration-200"
    >
      <td className="px-6 py-4 whitespace-nowrap font-medium text-green-900 font-serif">
        {title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-green-700 font-medium">
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
          <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center text-green-400 font-serif">
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
