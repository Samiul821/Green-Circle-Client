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
    <div className="max-w-sm mx-auto bg-gradient-to-br from-green-700 to-lime-600 rounded-3xl shadow-xl overflow-hidden border border-green-900 text-white hover:shadow-2xl transition-all duration-300">
      {/* Image */}
      <div className="w-full h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover brightness-90"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h2 className="text-2xl playfair font-bold">{name}</h2>
        <div className="text-sm opacity-90">
          <p>🧓 Age: {age} | 🚻 Gender: {gender}</p>
          <p>💍 Status: {status}</p>
        </div>

        <div className="text-sm nunito font-medium space-y-1">
          <p>🌱 Experience: <span className="font-bold">{experiences}</span></p>
          <p>💡 Shared Tips: {totalSharedTips}</p>
        </div>

        <p className="text-sm nunito text-green-100 italic">{otherInfo}</p>

        <button className="mt-3 px-4 py-2 bg-white text-green-800 font-semibold rounded-xl hover:bg-lime-100 transition shadow-md">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default Gardener;
