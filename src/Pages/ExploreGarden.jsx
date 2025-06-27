import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import ExploreGardenes from "../components/ExploreGardenes";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../Provider/ThemeContext"; // ধরলাম তোমার থিম কন্টেক্সট এ আছে isDark

const ExploreGarden = () => {
  const data = useLoaderData();
  const { isDark } = useContext(ThemeContext);

  return (
    <main
      className={`
        min-h-screen py-12 px-[5%] lg:px-[10%] 
        ${isDark ? "bg-gray-900" : "bg-green-50"}
      `}
    >
      <Helmet>
        <title>Explore | Green Circle</title>
      </Helmet>

      <h1
        className={`
          text-5xl font-extrabold text-center mb-16 drop-shadow-md select-none
          ${isDark ? "text-gray-100" : "text-green-900"}
        `}
        aria-label="Meet Our Gardeners"
      >
        🌱 Meet Our Gardeners
      </h1>

      <section
        aria-live="polite"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
      >
        {data && data.length > 0 ? (
          data.map((gardener) => (
            <ExploreGardenes key={gardener._id} gardener={gardener} />
          ))
        ) : (
          <p
            className={`
              col-span-full text-center text-lg 
              ${isDark ? "text-gray-400" : "text-green-700"}
            `}
          >
            No gardeners found.
          </p>
        )}
      </section>
    </main>
  );
};

export default ExploreGarden;
