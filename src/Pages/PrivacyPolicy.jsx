import React from "react";

import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white text-gray-800 p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
          Privacy Policy
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            1. Information Collection
          </h2>
          <p className="text-gray-700">
            We collect personal information that you provide to us when using
            Green Circle, such as your name, email address, and any other data
            you choose to share.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            2. Use of Information
          </h2>
          <p className="text-gray-700">
            Your information is used to provide, maintain, and improve our
            services, to communicate with you, and to comply with legal
            obligations.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            3. Data Security
          </h2>
          <p className="text-gray-700">
            We implement reasonable security measures to protect your data from
            unauthorized access, alteration, or disclosure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            4. Third-Party Sharing
          </h2>
          <p className="text-gray-700">
            We do not sell or rent your personal information. However, we may
            share information with trusted partners to operate our services or
            comply with the law.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            5. Your Choices
          </h2>
          <p className="text-gray-700">
            You may update or delete your information by contacting us. You can
            also opt out of marketing communications.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            6. Changes to this Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy periodically. Your continued use
            of Green Circle after changes constitutes your acceptance of the
            updated policy.
          </p>
        </section>

        <p className="text-sm text-center text-gray-500 mt-8">
          © {new Date().getFullYear()} Green Circle. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
