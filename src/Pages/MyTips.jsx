import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";

const MyTips = () => {
  const { user } = useContext(AuthContext);
  const [myTips, setMyTips] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/gardenTips?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyTips(data);
      })
      .catch((error) => {
        console.error("Error fetching my tips:", error);
      });
  }, [user]);

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-10 bg-gradient-to-b from-green-100 via-green-50 to-white min-h-screen">
      <h1 className="text-4xl playfair font-bold text-green-800 mb-8 text-center">
        My All Gardening Tips
      </h1>

      {myTips.length === 0 ? (
        <p className="text-center text-gray-500">No tips found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {myTips.map((tip, index) => (
            <motion.div
              key={tip._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              className="bg-white border-l-4 border-green-500 shadow-md p-6 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-2xl raleway font-semibold text-green-700 mb-2">
                {tip.title}
              </h2>
              <p className="text-sm nunito text-gray-600 mb-1">
                <span className="font-medium text-green-600">Category:</span>{" "}
                {tip.category}
              </p>
              <p className="text-sm nunito text-gray-600 mb-4">
                <span className="font-medium text-green-600">Difficulty:</span>{" "}
                {tip.difficulty}
              </p>
              <div className="flex justify-end gap-2">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-lg transition duration-200">
                  Update
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200">
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTips;
