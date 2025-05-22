import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaLeaf,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-100 text-green-900 py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
        {/* Logo & About */}
        <div className="space-y-3">
          <Link to='/' className="flex items-center gap-2 text-2xl font-bold text-green-800">
            <FaLeaf className="text-green-600" />
            Green Circle
          </Link>
          <p className="text-sm text-green-700">
            Growing together with nature. Green Circle is your gardening guide
            and green friend.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-900">
            Contact Us
          </h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-700" />
              +880 1330 624539
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-green-700" />
              support@greencircle.com
            </li>
          </ul>
        </div>

        {/* Links & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-900">More</h3>
          <ul className="text-sm space-x-2 mb-4">
            <Link to='/terms' className="underline">Terms & Conditions</Link>
            <Link to='/policy' className="underline">Privacy Policy</Link>
          </ul>
          <div className="flex gap-4 text-green-700 text-xl">
            <a href="https://www.facebook.com/smsamiul890" target="_blank">
              <FaFacebookF />
            </a>
            <a href="https://x.com/SmSamiul890" target="_blank">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/in/samiul-islam-40942a34a/" target="_blank">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t pt-4 text-center text-sm text-green-700">
        © {new Date().getFullYear()} Green Circle. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
