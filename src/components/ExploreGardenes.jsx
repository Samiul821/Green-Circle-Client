import React from "react";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      whileHover={{ scale: 1.06, boxShadow: "0 20px 25px rgba(16, 185, 129, 0.4)" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-3xl shadow-md hover:shadow-lg cursor-pointer overflow-hidden flex flex-col"
    >
      <div className="relative h-52 w-full overflow-hidden rounded-t-3xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-110"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-green-900/80 to-transparent p-4">
          <h3 className="text-white text-2xl font-bold drop-shadow-md">{name}</h3>
          <p className="text-green-300 text-sm">{status}</p>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between mb-3 text-green-700 font-semibold text-sm">
          <span>Age: {age}</span>
          <span>Gender: {gender}</span>
        </div>

        <div className="flex-grow mb-4">
          <h4 className="text-green-800 font-semibold mb-2">Experiences</h4>
          <ul className="list-disc list-inside max-h-28 overflow-y-auto text-green-700 text-sm space-y-1">
            {Array.isArray(experiences)
              ? experiences.map((exp, idx) => <li key={idx}>{exp}</li>)
              : <li>{experiences}</li>}
          </ul>
        </div>

        <p className="text-green-600 font-medium mb-1">
          🌿 Shared Tips: <span className="text-green-800">{totalSharedTips}</span>
        </p>

        {otherInfo && (
          <p className="text-green-500 italic text-xs mt-1 line-clamp-3">{`"${otherInfo}"`}</p>
        )}
      </div>
    </motion.div>
  );
};

export default ExploreGardenes;
