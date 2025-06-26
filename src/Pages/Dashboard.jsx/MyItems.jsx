import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const [myTips, setMyTips] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://green-circle-server-indol.vercel.app/gardenTips?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMyTips(data);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://green-circle-server-indol.vercel.app/gardenTips/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMyTips(myTips.filter((item) => item._id !== id));
              Swal.fire("Deleted!", "Your tip has been removed.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="min-h-screen py-4 lg:px-[5%]">
      <Helmet>
        <title>My Tips | Green Circle</title>
      </Helmet>

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center text-green-800 mb-8 font-serif"
      >
        My Garden Tips
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {myTips.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -6,
              scale: 1.02,
              boxShadow: "0px 12px 25px rgba(34, 197, 94, 0.4)",
            }}
            transition={{
              duration: 0.3, // card mount duration
              ease: "easeOut",
              delay: index * 0.05, // staggered loading animation
              boxShadow: { duration: 0.4 }, // hover glow shadow delay
              scale: { duration: 0.3 },
              y: { duration: 0.3 },
            }}
            className="bg-white rounded-2xl border border-green-100 p-5 cursor-pointer transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-semibold text-green-800 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">Category: {item.category}</p>
              <p className="text-sm text-gray-500">Likes: {item.likes || 0}</p>

              <div className="flex items-center gap-4 pt-3 text-[17px]">
                <Link
                  to={`/tips/${item._id}`}
                  title="View"
                  className="text-green-600 hover:text-green-800 transition"
                >
                  <FaEye />
                </Link>

                <Link
                  to={`/dashboard/update-tip/${item._id}`}
                  title="Edit"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <FaEdit />
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  title="Delete"
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {myTips.length === 0 && (
        <p className="text-center text-green-700 font-semibold mt-10">
          No tips found.
        </p>
      )}
    </div>
  );
};

export default MyItems;
