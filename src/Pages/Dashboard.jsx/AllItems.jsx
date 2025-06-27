import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Provider/ThemeContext";

const AllItems = () => {
  const { isDark } = useContext(ThemeContext);
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
    <div
      className={`min-h-screen py-4  ${
        isDark ? "bg-gray-900" : ""
      }`}
    >
      <Helmet>
        <title>All Items | Green Circle</title>
      </Helmet>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`text-4xl font-extrabold text-center mb-6 font-serif ${
          isDark ? "text-green-400" : "text-green-900"
        }`}
      >
        All Garden Tips
      </motion.h1>

      <div className="mb-8 flex justify-center">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className={`px-5 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 font-medium ${
            isDark
              ? "border-gray-600 bg-gray-800 text-green-300"
              : "border-green-300 text-green-800 bg-white"
          }`}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div
        className={`relative max-w-full rounded-3xl shadow-lg overflow-hidden ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Scrollable container with fixed height */}
        <div className="overflow-auto h-[700px]">
          <table
            className={`w-full min-w-[600px] md:min-w-[650px] lg:min-w-[900px] divide-y ${
              isDark ? "divide-gray-700" : "divide-green-200"
            }`}
          >
            <thead
              className={`sticky top-0 z-10 shadow-md font-semibold font-serif ${
                isDark
                  ? "bg-gray-900 text-green-400"
                  : "bg-green-700 text-white"
              }`}
            >
              <tr>
                <th className="px-6 py-4 text-left text-sm uppercase">Image</th>
                <th className="px-6 py-4 text-left text-sm uppercase">Title</th>
                <th className="px-6 py-4 text-left text-sm uppercase">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm uppercase">Likes</th>
                <th className="px-6 py-4 text-left text-sm uppercase">User</th>
                <th className="px-6 py-4 text-left text-sm uppercase">
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
                    className={`hover:bg-green-50 transition ${
                      isDark ? "hover:bg-gray-700" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={item.image || "/default.jpg"}
                        alt={item.title}
                        className="w-8 h-8 md:w-12 md:h-12 rounded-md object-cover shadow"
                      />
                    </td>
                    <td
                      className={`px-6 py-4 max-w-xs truncate ${
                        isDark ? "text-green-300" : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        isDark ? "text-green-400" : "text-gray-700"
                      }`}
                    >
                      {item.category || "N/A"}
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        isDark ? "text-green-400" : "text-gray-700"
                      }`}
                    >
                      {item.likes || 0}
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        isDark ? "text-green-400" : "text-gray-700"
                      }`}
                    >
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
                    className={`text-center font-semibold py-6 ${
                      isDark ? "text-green-400" : "text-green-700"
                    }`}
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
