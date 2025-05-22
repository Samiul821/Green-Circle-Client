import React from "react";
import { useLoaderData } from "react-router-dom";
import TipRow from "../components/TipRow";
import { motion } from "framer-motion";

const BrowseTips = () => {
  const data = useLoaderData();
  const publicTips = data.filter((tip) => tip.availability === "Public");

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 via-green-100 to-green-200 py-12 px-[5%] lg:px-[10%]">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl font-extrabold text-center text-green-900 mb-12 font-serif"
      >
        Browse Public Tips
      </motion.h1>

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
            {publicTips.map((tip) => (
              <TipRow key={tip._id} tip={tip} />
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};

export default BrowseTips;
