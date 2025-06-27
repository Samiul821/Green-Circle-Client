import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import TipRow from "../components/TipRow";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../Provider/ThemeContext";

const BrowseTips = () => {
  const data = useLoaderData();
  const { isDark } = useContext(ThemeContext);

  const publicTips = data.filter((tip) => tip.availability === "Public");

  const [difficulty, setDifficulty] = useState("All");

  const filteredTips =
    difficulty === "All"
      ? publicTips
      : publicTips.filter((tip) => tip.difficulty === difficulty);

  return (
    <div
      className={`min-h-screen py-12 px-[5%] lg:px-[10%] ${
        isDark ? "bg-gray-900" : "bg-green-50"
      }`}
    >
      <Helmet>
        <title>Browse Tips | Green Circle</title>
      </Helmet>

      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`text-4xl font-extrabold text-center mb-6 font-serif ${
          isDark ? "text-gray-100" : "text-green-900"
        }`}
      >
        Browse Public Tips
      </motion.h1>

      <div className="mb-8 flex justify-center">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className={`
            px-5 py-2 rounded-lg border shadow-sm font-medium
            focus:outline-none focus:ring-2
            ${
              isDark
                ? "border-gray-600 bg-gray-800 text-gray-200 focus:ring-green-400"
                : "border-green-300 bg-white text-green-800 focus:ring-green-500"
            }
          `}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Table */}
      <div
        className={`overflow-x-auto rounded-3xl shadow-lg ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <table className="min-w-full divide-y">
          <thead
            className={`font-semibold font-serif ${
              isDark ? "bg-green-900 text-green-300" : "bg-green-700 text-white"
            }`}
          >
            <tr>
              <th className="px-6 py-4 text-left text-sm uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-sm uppercase tracking-wider">
                See More
              </th>
            </tr>
          </thead>

          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filteredTips.length > 0 ? (
              filteredTips.map((tip) => (
                <TipRow key={tip._id} tip={tip} isDark={isDark} />
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className={`text-center font-semibold py-6 ${
                    isDark ? "text-gray-400" : "text-green-700"
                  }`}
                >
                  No tips found for selected difficulty.
                </td>
              </tr>
            )}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};

export default BrowseTips;
