import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";

const TipDetails = () => {
  const tip = useLoaderData();

  if (!tip) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-700 font-semibold">
        Loading tip details...
      </div>
    );
  }

  const {
    title,
    plantType,
    difficulty,
    description,
    image,
    category,
    availability,
  } = tip;

  const [liked, setLiked] = useState(false);
  const toggleLike = () => setLiked(!liked);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 via-green-100 to-green-200 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full bg-white backdrop-blur-md bg-opacity-70 rounded-3xl shadow-2xl p-10 relative overflow-hidden"
      >
        {/* Decorative Circles */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 15, 0],
            y: [0, -15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
          }}
          className="absolute top-[-60px] left-[-60px] w-36 h-36 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[-60px] right-[-60px] w-36 h-36 bg-lime-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Image */}
          {image && (
            <motion.img
              src={image}
              alt={title}
              loading="lazy"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-3xl w-full md:w-1/3 object-cover shadow-lg"
            />
          )}

          {/* Details */}
          <div className="flex flex-col flex-grow">
            <h1 className="text-4xl font-serif font-extrabold text-green-900 mb-6">
              {title}
            </h1>

            <div className="flex flex-wrap gap-6 text-green-700 font-semibold mb-6 text-base">
              <span>
                <strong>Plant Type:</strong> {plantType}
              </span>
              <span>
                <strong>Difficulty:</strong> {difficulty}
              </span>
              <span>
                <strong>Category:</strong> {category}
              </span>
              <span>
                <strong>Availability:</strong> {availability}
              </span>
            </div>

            <p className="text-green-800 text-lg leading-relaxed mb-8">
              {description}
            </p>

            <motion.button
              onClick={toggleLike}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`self-start px-8 py-3 rounded-full font-semibold text-white text-lg shadow-lg transition-colors duration-300
                ${
                  liked
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-600 hover:bg-green-700"
                }
              `}
              aria-pressed={liked}
            >
              {liked ? "❤️ Liked" : "🤍 Like"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TipDetails;
