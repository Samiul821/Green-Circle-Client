import React from "react";
import { Typewriter } from "react-simple-typewriter";
import CustomSlider from "./CustomSlider";
import { Link } from "react-router-dom";

const Banner = () => {
  const fixedText = "Grow your garden with";
  const changingWords = [
    "expert tips",
    "love & care",
    "organic methods",
    "sustainable ideas",
  ];

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between h-[65vh] bg-green-100 rounded-3xl overflow-hidden shadow-xl px-6 md:px-16 mb-10">
      {/* Left Side */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-green-800 min-h-[4rem]">
          {fixedText}{" "} <br />
          <span className="text-green-600">
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
        <p className="text-green-700 max-w-md text-base md:text-lg">
          Discover a community of passionate gardeners and eco-lovers. Share,
          learn, and grow together.
        </p>
        <Link
          to="/browserTips"
          className="mt-4 bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 px-8 rounded-full shadow-lg inline-block"
        >
          Get Started
        </Link>
      </div>

      {/* Right Fixed Image */}
      <CustomSlider></CustomSlider>
    </div>
  );
};

export default Banner;
