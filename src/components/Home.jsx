import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Gardener from "./Gardener";
import Banner from "./Banner";
import OurExpert from "./OurExpert";
import OurAchievements from "./OurAchievements";
import TopTrending from "./TopTrending";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../Provider/ThemeContext";

const Home = () => {
  const gardeners = useLoaderData();
  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen space-y-16 py-16 px-[5%] lg:px-[10%] ${
        isDark
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200"
          : ""
      }`}
    >
      <Helmet>
        <title>Home | Green Circle</title>
      </Helmet>
      <Banner />
      <h1
        className={`text-4xl font-bold text-center playfair bg-clip-text text-transparent
            ${
              isDark
                ? "bg-gradient-to-r from-green-300 to-lime-400"
                : "bg-gradient-to-r from-green-700 to-lime-400"
            }
          `}
        ঌ
      >
        Featured Gardeners
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {gardeners.map((gardener) => (
          <Gardener key={gardener._id} gardener={gardener} />
        ))}
      </div>
      <TopTrending />
      <OurExpert />
      <OurAchievements />
    </div>
  );
};

export default Home;
