import React, { useContext } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaLeaf,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Provider/ThemeContext";

const Footer = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <footer
      className={`relative py-10 px-6 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-inner shadow-green-500/10"
          : "bg-green-100 text-green-900"
      }`}
    >
      {/* Gradient top border line in dark mode */}
      {isDark && (
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-400 via-lime-400 to-green-400 opacity-50" />
      )}

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
        {/* Logo & About */}
        <div className="space-y-3">
          <Link
            to="/"
            className={`flex items-center gap-2 text-2xl font-bold ${
              isDark ? "text-lime-400" : "text-green-800"
            }`}
          >
            <FaLeaf
              className={`${isDark ? "text-green-400" : "text-green-600"}`}
            />
            Green Circle
          </Link>
          <p
            className={`${
              isDark ? "text-gray-300" : "text-green-800 font-medium"
            }`}
          >
            Growing together with nature. Green Circle is your gardening guide
            and green friend.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3
            className={`${
              isDark ? "text-white" : "text-green-800"
            } text-lg font-semibold mb-3`}
          >
            Contact Us
          </h3>
          <ul
            className={`text-sm space-y-2 ${
              isDark ? "text-lime-300" : "text-green-800"
            }`}
          >
            <li className="flex items-center gap-2">
              <FaPhoneAlt
                className={`${isDark ? "text-lime-300" : "text-green-700"}`}
              />
              +880 1330 624539
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope
                className={`${isDark ? "text-lime-300" : "text-green-700"}`}
              />
              support@greencircle.com
            </li>
          </ul>
        </div>

        {/* Links & Social */}
        <div>
          <h3
            className={`${
              isDark ? "text-white" : "text-green-800"
            } text-lg font-semibold mb-3`}
          >
            More
          </h3>
          <ul className="text-sm space-x-2 mb-4 flex gap-4">
            <Link
              to="/terms"
              className={`underline ${
                isDark ? "text-lime-300" : "text-green-800"
              } font-medium`}
            >
              Terms & Conditions
            </Link>
            <Link
              to="/policy"
              className={`underline ${
                isDark ? "text-lime-300" : "text-green-800"
              } font-medium`}
            >
              Privacy Policy
            </Link>
          </ul>
          <div
            className={`flex gap-4 text-xl ${
              isDark ? "text-lime-400" : "text-green-700"
            }`}
          >
            <a
              href="https://www.facebook.com/smsamiul890"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/SmSamiul890"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/samiul-islam-40942a34a/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div
        className={`mt-10 border-t pt-4 text-center text-sm ${
          isDark
            ? "text-gray-400 border-gray-700"
            : "text-green-800 border-green-400"
        }`}
      >
        © {new Date().getFullYear()} Green Circle. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
