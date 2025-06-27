import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ThemeContext } from "../../Provider/ThemeContext";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const [myTips, setMyTips] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://green-circle-server-indol.vercel.app/gardenTips?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMyTips(data);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: isDark ? "#1f2937" : "#fff",
      color: isDark ? "#d1fae5" : "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://green-circle-server-indol.vercel.app/gardenTips/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMyTips(myTips.filter((item) => item._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Your tip has been removed.",
                icon: "success",
                background: isDark ? "#1f2937" : "#fff",
                color: isDark ? "#d1fae5" : "#000",
              });
            }
          });
      }
    });
  };

  return (
    <div className={`min-h-screen py-4 ${isDark ? "bg-gray-900" : ""}`}>
      <Helmet>
        <title>My Tips | Green Circle</title>
      </Helmet>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`text-4xl font-extrabold text-center mb-8 font-serif ${
          isDark ? "text-green-400" : "text-green-800"
        }`}
      >
        My Garden Tips
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {myTips.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -6,
              scale: 1.02,
              boxShadow: "0px 12px 25px rgba(34, 197, 94, 0.4)",
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              delay: index * 0.05,
              boxShadow: { duration: 0.4 },
              scale: { duration: 0.3 },
              y: { duration: 0.3 },
            }}
            className={`rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${
              isDark
                ? "bg-gray-800 border-gray-700 text-green-300"
                : "bg-white border-green-100 text-gray-900"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-44 object-cover rounded-md shadow"
            />
            <div className="p-4 space-y-1">
              <h3
                className={`text-lg font-semibold line-clamp-1 ${
                  isDark ? "text-green-400" : "text-green-800"
                }`}
              >
                {item.title}
              </h3>
              <p className={`${isDark ? "text-green-300" : "text-gray-600"}`}>
                Category: {item.category}
              </p>
              <p className={`${isDark ? "text-green-300" : "text-gray-500"}`}>
                Likes: {item.likes || 0}
              </p>

              <div className="flex items-center gap-4 pt-3 text-[17px]">
                <Link
                  to={`/tipDetails/${item._id}`}
                  title="View"
                  className={`transition ${
                    isDark
                      ? "text-green-400 hover:text-green-200"
                      : "text-green-600 hover:text-green-800"
                  }`}
                >
                  <FaEye />
                </Link>

                <Link
                  to={`/updateTip/${item._id}`}
                  title="Edit"
                  className={`transition ${
                    isDark
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  <FaEdit />
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  title="Delete"
                  className={`transition ${
                    isDark
                      ? "text-red-400 hover:text-red-300"
                      : "text-red-600 hover:text-red-800"
                  }`}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {myTips.length === 0 && (
        <p
          className={`text-center font-semibold mt-10 ${
            isDark ? "text-green-400" : "text-green-700"
          }`}
        >
          No tips found.
        </p>
      )}
    </div>
  );
};

export default MyItems;
