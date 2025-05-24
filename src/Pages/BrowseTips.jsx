import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TipRow from "../components/TipRow";
import { motion } from "framer-motion";

const BrowseTips = () => {
  const data = useLoaderData();
  const publicTips = data.filter((tip) => tip.availability === "Public");

  const [difficulty, setDifficulty] = useState("All");

  const filteredTips =
    difficulty === "All"
      ? publicTips
      : publicTips.filter((tip) => tip.difficulty === difficulty);


  return (
    <div className="min-h-screen  py-12 px-[5%] lg:px-[10%]">
      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl font-extrabold text-center text-green-900 mb-6 font-serif"
      >
        Browse Public Tips
      </motion.h1>

      <div className="mb-8 flex justify-center">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-5 py-2 rounded-lg border border-green-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800 font-medium"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl shadow-lg bg-white">
        <table className="min-w-full divide-y divide-green-200">
          <thead className="bg-green-700 text-white font-semibold font-serif">
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
              filteredTips.map((tip) => <TipRow key={tip._id} tip={tip} />)
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-green-700 font-semibold py-6"
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
