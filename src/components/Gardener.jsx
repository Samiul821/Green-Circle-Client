import React from "react";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02, boxShadow: "0px 8px 24px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-3xl overflow-hidden border border-green-100 bg-white"
    >
      {/* Top Image Section */}
      <div className="relative h-48 bg-green-100">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-5 text-white z-10">
          <h2 className="text-xl font-bold tracking-wide">{name}</h2>
          <p className="text-sm text-white/90">
            {gender}, {age} yrs
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-2 text-green-900">
        <div className="flex justify-between text-sm font-medium text-gray-700">
          <span>
            Status:{" "}
            <span className="font-semibold text-green-700">{status}</span>
          </span>
          <span>
            Tips:{" "}
            <span className="font-semibold text-green-700">
              {totalSharedTips}
            </span>
          </span>
        </div>

        <p className="text-sm text-gray-800">
          Experience: <span className="font-semibold">{experiences}</span>
        </p>

        {otherInfo && (
          <p className="text-xs italic text-green-700 mt-3 border-t pt-3 border-green-100 leading-snug">
            {otherInfo}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Gardener;
