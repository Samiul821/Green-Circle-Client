import React, { useContext } from "react";
import { FaLeaf, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../Provider/ThemeContext";

const ErrorPage = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className={`${isDark ? "bg-gray-900 text-green-300" : "bg-green-50 text-green-900"} min-h-screen`}>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 min-h-screen">
        <Helmet>
          <title>Page Not Found | Green Circle</title>
        </Helmet>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`max-w-md p-10 rounded-3xl shadow-xl text-center
            backdrop-blur-md
            ${
              isDark
                ? "bg-gray-800 bg-opacity-70"
                : "bg-white bg-opacity-80"
            }`}
        >
          <FaLeaf className={`mx-auto mb-4 text-6xl ${isDark ? "text-green-400" : "text-green-600"}`} />
          <h1 className={`text-6xl font-extrabold mb-4 ${isDark ? "text-green-400" : "text-green-800"}`}>
            404
          </h1>
          <h2 className={`text-2xl font-semibold mb-6 ${isDark ? "text-green-300" : "text-green-900"}`}>
            Oops! Page Not Found
          </h2>
          <p className={`mb-8 ${isDark ? "text-green-400" : "text-green-700"}`}>
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <Link
            to="/"
            className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full shadow-lg transition
              ${
                isDark
                  ? "bg-green-700 hover:bg-green-600 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
          >
            <FaHome />
            Go to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
