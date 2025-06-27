import React, { useContext } from "react";
import { Typewriter } from "react-simple-typewriter";
import CustomSlider from "./CustomSlider";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Provider/ThemeContext";

const Banner = () => {
  const { isDark } = useContext(ThemeContext);

  const fixedText = "Grow your garden with";
  const changingWords = [
    "expert tips",
    "love & care",
    "organic methods",
    "sustainable ideas",
  ];

  return (
    <div
      className={`flex flex-col-reverse md:flex-row items-center justify-between rounded-3xl overflow-hidden shadow-xl px-4 sm:px-8 md:px-12 lg:px-16 py-10 gap-10 md:gap-0 mb-10
      ${
        isDark
          ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black"
          : "bg-gradient-to-r from-green-100 via-green-200 to-green-300"
      }`}
    >
      {/* Left Side */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h1
          className={`text-2xl sm:text-3xl md:text-5xl font-extrabold ${
            isDark ? "text-gray-200" : "text-green-800"
          }`}
        >
          {fixedText} <br />
          <span className={isDark ? "text-green-400" : "text-green-600"}>
            <Typewriter
              words={changingWords}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </span>
        </h1>
        <p
          className={`max-w-md text-base md:text-lg mx-auto md:mx-0 ${
            isDark ? "text-gray-300" : "text-green-700"
          }`}
        >
          Discover a community of passionate gardeners and eco-lovers. Share,
          learn, and grow together.
        </p>
        <Link
          to="/browserTips"
          className={`inline-block mt-4 font-semibold py-3 px-8 rounded-full shadow-lg transition
            ${
              isDark
                ? "bg-green-700 hover:bg-green-600 text-gray-100"
                : "bg-green-600 hover:bg-green-700 text-white"
            }
          `}
        >
          Get Started
        </Link>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <CustomSlider />
      </div>
    </div>
  );
};

export default Banner;
