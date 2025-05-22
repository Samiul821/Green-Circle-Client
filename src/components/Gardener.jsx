import React from "react";

const Gardener = ({ gardener }) => {
  const {
    name,
    age,
    gender,
    status,
    experiences,
    image,
    totalSharedTips,
    otherInfo,
  } = gardener;

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-green-200 bg-white transition hover:shadow-2xl">
      {/* Top Banner with Image */}
      <div className="relative h-48 bg-green-200">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
        <div className="absolute bottom-3 left-4 text-white z-10">
          <h2 className="text-xl md:text-2xl font-bold font-serif">{name}</h2>
          <p className="text-sm">{gender}, {age} yrs</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5 space-y-2 text-green-800">
        <div className="flex justify-between text-sm font-medium">
          <span>💍 Status: <strong>{status}</strong></span>
          <span>💡 Tips: <strong>{totalSharedTips}</strong></span>
        </div>

        <p className="text-sm">
          🌱 Experience: <span className="font-semibold">{experiences}</span>
        </p>

        {otherInfo && (
          <p className="text-xs italic text-green-700 mt-2 border-t pt-2 border-green-100">
            {otherInfo}
          </p>
        )}
      </div>

      {/* Action Button */}
      <div className="px-5 pb-5">
        <button className="w-full py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default Gardener;
