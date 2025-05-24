import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const TermsConditions = () => {
  return (
    <div className="min-h-screen  text-gray-800 p-6 md:p-12">
      <Helmet>
        <title>Terms & Conditions | Green Circle</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
          Terms & Conditions
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700">
            By accessing or using Green Circle, you agree to comply with and be
            bound by these Terms and Conditions. If you do not agree, please do
            not use the service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            2. Use of Services
          </h2>
          <p className="text-gray-700">
            You agree to use the platform only for lawful purposes. You are
            responsible for your activity and the content you share on Green
            Circle.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            3. Privacy Policy
          </h2>
          <p className="text-gray-700">
            We care about your privacy. Please refer to our Privacy Policy to
            understand how we collect, use, and protect your data.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            4. Termination
          </h2>
          <p className="text-gray-700">
            Green Circle reserves the right to suspend or terminate your access
            if you violate these terms or misuse the service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            5. Changes to Terms
          </h2>
          <p className="text-gray-700">
            We may update these Terms from time to time. Continued use after
            changes implies acceptance of the updated terms.
          </p>
        </section>

        <p className="text-sm text-center text-gray-500 mt-8">
          © {new Date().getFullYear()} Green Circle. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default TermsConditions;
