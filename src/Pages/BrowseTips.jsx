import React from "react";
import { useLoaderData } from "react-router-dom";
import TipRow from "../components/TipRow";

const BrowseTips = () => {
  const data = useLoaderData();
  const publicTips = data.filter((tip) => tip.availability === "Public");

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Browse Public Tips
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Image</th>
              <th>See More</th>
            </tr>
          </thead>
          <tbody>
            {publicTips.map((tip) => (
              <TipRow key={tip._id} tip={tip} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrowseTips;
