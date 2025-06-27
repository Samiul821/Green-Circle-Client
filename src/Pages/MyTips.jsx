import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyTips = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const [myTips, setMyTips] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://green-circle-server-indol.vercel.app/gardenTips?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMyTips(data);
      });
  }, [user?.email]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://green-circle-server-indol.vercel.app/gardenTips/${_id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              setMyTips(myTips.filter((tip) => tip._id !== _id));
              Swal.fire("Deleted!", "Your tip has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.error("Error deleting tip:", error);
            Swal.fire("Error", "Failed to delete the tip.", "error");
          });
      }
    });
  };

  return (
    <div
      className={`min-h-screen px-[5%] lg:px-[10%] py-12 ${
        isDark ? "bg-gray-900 text-green-300" : "bg-green-50 text-green-900"
      }`}
    >
      <Helmet>
        <title>
          {myTips.length > 0
            ? "My Tips | Green Circle"
            : "No Tips | Green Circle"}
        </title>
      </Helmet>

      <h1
        className={`text-4xl playfair font-bold mb-10 text-center ${
          isDark ? "text-green-400" : "text-green-800"
        }`}
      >
        My Gardening Tips
      </h1>

      {myTips.length === 0 ? (
        <p
          className={`text-center ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          No tips found.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {myTips.map((tip, index) => (
            <motion.div
              key={tip._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              className={`p-6 rounded-2xl shadow-lg border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-green-300"
              }`}
              style={{
                backgroundImage: "url('/garden-pattern.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <h2
                className={`text-2xl raleway font-semibold mb-3 ${
                  isDark ? "text-green-300" : "text-green-700"
                }`}
              >
                {tip.title}
              </h2>
              <p
                className={`text-sm nunito mb-1 ${
                  isDark ? "text-green-400" : "text-gray-700"
                }`}
              >
                <span
                  className={`font-medium ${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                >
                  Category:
                </span>{" "}
                {tip.category}
              </p>
              <p
                className={`text-sm nunito mb-4 ${
                  isDark ? "text-green-400" : "text-gray-700"
                }`}
              >
                <span
                  className={`font-medium ${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                >
                  Difficulty:
                </span>{" "}
                {tip.difficulty}
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <Link
                  to={`/updateTip/${tip._id}`}
                  className="bg-amber-400 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(tip._id)}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTips;
