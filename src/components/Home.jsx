import React from "react";
import { useLoaderData } from "react-router-dom";
import Gardener from "./Gardener";
import Banner from "./Banner";

const Home = () => {
  const gardeners = useLoaderData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 py-10 px-[5%] lg:px-[10%]">
      <Banner />
      <h1 className="text-4xl font-extrabold text-green-900 text-center mb-10">
        Featured Gardeners
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {gardeners.map((gardener) => (
          <Gardener key={gardener._id} gardener={gardener} />
        ))}
      </div>
    </div>
  );
};

export default Home;
