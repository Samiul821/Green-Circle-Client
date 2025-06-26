import React from "react";
import { useLoaderData } from "react-router-dom";
import Gardener from "./Gardener";
import Banner from "./Banner";
import OurExpert from "./OurExpert";
import OurAchievements from "./OurAchievements";
import TopTrending from "./TopTrending";
import { Helmet } from "react-helmet-async";



const Home = () => {
  const gardeners = useLoaderData();

  return (
    <div className="min-h-screen py-10 px-[5%] lg:px-[10%]">
      <Helmet>
        <title>Home | Green Circle</title>
      </Helmet>
      <Banner />
      <h1 className="text-4xl raleway font-extrabold text-green-900 text-center mb-10">
        Featured Gardeners
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
