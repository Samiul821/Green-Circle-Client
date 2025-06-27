import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../Provider/ThemeContext";

const PrivacyPolicy = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen p-6 md:p-12 transition-colors duration-500 ${
        isDark ? "bg-gray-900 text-green-300" : "bg-green-50 text-green-900"
      }`}
    >
      <Helmet>
        <title>Privacy Policy | Green Circle</title>
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
          Privacy Policy
        </h1>

        {[
          {
            title: "1. Information Collection",
            text: "We collect personal information that you provide to us when using Green Circle, such as your name, email address, and any other data you choose to share.",
          },
          {
            title: "2. Use of Information",
            text: "Your information is used to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.",
          },
          {
            title: "3. Data Security",
            text: "We implement reasonable security measures to protect your data from unauthorized access, alteration, or disclosure.",
          },
          {
            title: "4. Third-Party Sharing",
            text: "We do not sell or rent your personal information. However, we may share information with trusted partners to operate our services or comply with the law.",
          },
          {
            title: "5. Your Choices",
            text: "You may update or delete your information by contacting us. You can also opt out of marketing communications.",
          },
          {
            title: "6. Changes to this Policy",
            text: "We may update this Privacy Policy periodically. Your continued use of Green Circle after changes constitutes your acceptance of the updated policy.",
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

export default PrivacyPolicy;
