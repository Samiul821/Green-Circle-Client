import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [difficulty, setDifficulty] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://green-circle-server-indol.vercel.app/gardenTips")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const filteredItems =
    difficulty === "All"
      ? items
      : items.filter((tip) => tip.difficulty === difficulty);

  return (
    <div className="min-h-screen py-4 lg:px-[5%]">
      <Helmet>
        <title>All Items | Green Circle</title>
      </Helmet>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl font-extrabold text-center text-green-900 mb-6 font-serif"
      >
        All Garden Tips
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

      <div className="relative max-w-full rounded-3xl shadow-lg bg-white overflow-hidden">
        {/* Scrollable container with fixed height */}
        <div className="overflow-auto h-[700px]">
          <table className="w-full min-w-[600px] md:min-w-[650px] lg:min-w-[900px] divide-y divide-green-200">
            <thead className="bg-green-700 text-white font-semibold font-serif sticky top-0 z-10 shadow-md">
              <tr>
                <th className="px-6 py-4 text-left text-sm uppercase bg-green-700">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm uppercase bg-green-700">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm uppercase bg-green-700">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm uppercase bg-green-700">
                  Likes
                </th>
                <th className="px-6 py-4 text-left text-sm uppercase bg-green-700">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm uppercase bg-green-700">
                  Action
                </th>
              </tr>
            </thead>

            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <motion.tr
                    key={item._id}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    className="hover:bg-green-50 transition"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={item.image || "/default.jpg"}
                        alt={item.title}
                        className="w-8 h-8 md:w-12 md:h-12 rounded-md object-cover shadow"
                      />
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="px-6 py-4">{item.category || "N/A"}</td>
                    <td className="px-6 py-4">{item.likes || 0}</td>
                    <td className="px-6 py-4">
                      {item.userEmail || item.email}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/tipDetails/${item._id}`}
                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition"
                      >
                        View
                      </Link>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-green-700 font-semibold py-6"
                  >
                    No items found for selected difficulty.
                  </td>
                </tr>
              )}
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllItems;
