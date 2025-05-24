import React from "react";
import { FaLeaf, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen  flex flex-col items-center justify-center px-6">
        <Helmet>
          <title>Page Not Found | Green Circle</title>
        </Helmet>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-xl max-w-md p-10 text-center"
        >
          <FaLeaf className="text-green-600 mx-auto mb-4 text-6xl" />
          <h1 className="text-6xl font-extrabold text-green-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-green-900 mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-green-700 mb-8">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
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
