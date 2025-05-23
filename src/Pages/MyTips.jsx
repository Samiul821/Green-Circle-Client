import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyTips = () => {
  const { user } = useContext(AuthContext);
  const [myTips, setMyTips] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://green-circle-server-indol.vercel.app/gardenTips?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyTips(data);
      })
      .catch((error) => {
        console.error("Error fetching my tips:", error);
      });
  }, [user]);

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        fetch(`https://green-circle-server-indol.vercel.app/gardenTips/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              setMyTips(myTips.filter((tip) => tip._id !== _id));
              Swal.fire("Deleted!", "Your tip has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.error("Error deleting tip:", error);
          });
      }
    })
  };

  return (
    <div className="px-[5%] lg:px-[10%] py-12 bg-gradient-to-b from-green-200 via-green-50 to-white min-h-screen">
      <h1 className="text-4xl playfair font-bold text-green-800 mb-10 text-center">
        My Gardening Tips
      </h1>

      {myTips.length === 0 ? (
        <p className="text-center text-gray-500">No tips found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {myTips.map((tip, index) => (
            <motion.div
              key={tip._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              className="bg-white border border-green-300 shadow-lg p-6 rounded-2xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
              style={{
                backgroundImage: "url('/garden-pattern.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <h2 className="text-2xl raleway font-semibold text-green-700 mb-3">
                {tip.title}
              </h2>
              <p className="text-sm nunito text-gray-700 mb-1">
                <span className="font-medium text-green-600">Category:</span>{" "}
                {tip.category}
              </p>
              <p className="text-sm nunito text-gray-700 mb-4">
                <span className="font-medium text-green-600">Difficulty:</span>{" "}
                {tip.difficulty}
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <Link
                  to={`/updateTip/${tip._id}`}
                  className="bg-amber-400 hover:bg-amber-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
                >
                  Update
                </Link>
                <button onClick={() => handleDelete(tip._id)} className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition">
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
