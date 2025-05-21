import React from "react";
import { useLoaderData } from "react-router-dom";
import Gardener from "./Gardener";

const Home = () => {
  const gardeners = useLoaderData();

  return (
    <div>
      <div>
        <h1 className="text-3xl text-center">Featured Gardeners</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {gardeners.map((gardener) => (
            <Gardener key={gardener._id} gardener={gardener}></Gardener>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
