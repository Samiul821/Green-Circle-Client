import React from "react";
import { useLoaderData } from "react-router-dom";
import ExploreGardenes from "../components/ExploreGardenes";
import { Helmet } from "react-helmet-async";

const ExploreGarden = () => {
  const data = useLoaderData();

  return (
    <div className="min-h-screen  py-12 px-[5%] lg:px-[10%]">
      <Helmet>
        <title>Explore | Green Circle</title>
      </Helmet>
      <h1 className="text-5xl font-extrabold text-green-900 text-center mb-16 drop-shadow-md">
        🌱 Meet Our Gardeners
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {data && data.length > 0 ? (
          data.map((gardener) => (
            <ExploreGardenes key={gardener._id} gardener={gardener} />
          ))
        ) : (
          <p className="col-span-full text-center text-green-700 text-lg">
            No gardeners found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExploreGarden;
