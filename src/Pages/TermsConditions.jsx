import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../Provider/ThemeContext";

const TermsConditions = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen p-6 md:p-12 transition-colors duration-500 ${
        isDark ? "bg-gray-900 text-green-300" : "bg-green-50 text-green-900"
      }`}
    >
      <Helmet>
        <title>Terms & Conditions | Green Circle</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`max-w-4xl mx-auto rounded-2xl shadow-2xl p-8 md:p-12 transition-colors duration-500 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-3xl md:text-4xl font-bold mb-6 text-center ${
            isDark ? "text-green-400" : "text-green-700"
          }`}
        >
          Terms & Conditions
        </h1>

        {[
          {
            title: "1. Acceptance of Terms",
            text: "By accessing or using Green Circle, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use the service.",
          },
          {
            title: "2. Use of Services",
            text: "You agree to use the platform only for lawful purposes. You are responsible for your activity and the content you share on Green Circle.",
          },
          {
            title: "3. Privacy Policy",
            text: "We care about your privacy. Please refer to our Privacy Policy to understand how we collect, use, and protect your data.",
          },
          {
            title: "4. Termination",
            text: "Green Circle reserves the right to suspend or terminate your access if you violate these terms or misuse the service.",
          },
          {
            title: "5. Changes to Terms",
            text: "We may update these Terms from time to time. Continued use after changes implies acceptance of the updated terms.",
          },
        ].map(({ title, text }, i) => (
          <section className="mb-6" key={i}>
            <h2
              className={`text-xl font-semibold mb-2 ${
                isDark ? "text-green-400" : "text-green-600"
              }`}
            >
              {title}
            </h2>
            <p
              className={`text-base ${
                isDark ? "text-green-300" : "text-gray-700"
              }`}
            >
              {text}
            </p>
          </section>
        ))}

        <p
          className={`text-sm text-center mt-8 ${
            isDark ? "text-green-500" : "text-gray-500"
          }`}
        >
          © {new Date().getFullYear()} Green Circle. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default TermsConditions;
