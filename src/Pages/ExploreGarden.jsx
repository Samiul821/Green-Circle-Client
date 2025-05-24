import React from "react";
import { useLoaderData } from "react-router-dom";
import ExploreGardenes from "../components/ExploreGardenes";

const ExploreGarden = () => {
  const data = useLoaderData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 py-12 px-[5%] lg:px-[10%]">
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
