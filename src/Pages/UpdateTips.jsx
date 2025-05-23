import React, { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateTips = () => {
  const { user } = use(AuthContext);
  const {
    _id,
    title,
    plantType,
    difficulty,
    category,
    description,
    image,
    availability,
  } = useLoaderData();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedTip = Object.fromEntries(formData.entries());

    // send the updated data to the server
    fetch(`https://green-circle-server-indol.vercel.app/gardenTips/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTip),
    })
    .then((res) => res.json())
    .then(data => {
        if(data.modifiedCount) {
            Swal.fire({
            position: "center",
            icon: "success",
            title: "Coffee updated successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-100 via-green-200 to-green-300 py-16 px-6 sm:px-12 lg:px-20 nunito">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-12 sm:p-16 border border-green-200">
        <h1 className="text-4xl font-extrabold text-green-900 mb-10 text-center tracking-wide playfair">
          Update Garden Tip
        </h1>
        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-base font-semibold text-green-900 mb-3 raleway">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={title}
              required
              placeholder="How I Grow Tomatoes Indoors"
              className="w-full rounded-2xl border border-green-400 px-6 py-4 text-green-900 placeholder-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-sm transition"
            />
          </div>

          {/* Plant Type */}
          <div>
            <label className="block text-base font-semibold text-green-900 mb-3 raleway">
              Plant Type / Topic
            </label>
            <input
              type="text"
              name="plantType"
              defaultValue={plantType}
              required
              className="w-full rounded-2xl border border-green-400 px-6 py-4 text-green-900 placeholder-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-sm transition"
            />
          </div>

          {/* Difficulty & Category */}
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label className="block text-base font-semibold text-green-900 mb-3 raleway">
                Difficulty Level
              </label>
              <select
                name="difficulty"
                required
                className="w-full rounded-2xl border border-green-400 px-6 py-4 text-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-sm transition"
                defaultValue={difficulty}
              >
                <option value="" disabled>
                  Select difficulty
                </option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-base font-semibold text-green-900 mb-3 raleway">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full rounded-2xl border border-green-400 px-6 py-4 text-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-sm transition"
                defaultValue={category}
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Composting">Composting</option>
                <option value="Plant Care">Plant Care</option>
                <option value="Vertical Gardening">Vertical Gardening</option>
                <option value="Hydroponics">Hydroponics</option>
                <option value="Indoor Plants">Indoor Plants</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-base font-semibold text-green-900 mb-3 raleway">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={description}
              rows="6"
              required
              className="w-full rounded-2xl border border-green-400 px-6 py-4 text-green-900 placeholder-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-sm transition resize-none"
              placeholder="Write your detailed tip here..."
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-base font-semibold text-green-900 mb-3 raleway">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              defaultValue={image}
              required
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-2xl border border-green-400 px-6 py-4 text-green-900 placeholder-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-sm transition"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-base font-semibold text-green-900 mb-3 raleway">
              Availability
            </label>
            <select
              name="availability"
              required
              className="w-full rounded-2xl border border-green-400 px-6 py-4 text-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-sm transition"
              defaultValue={availability}
            >
              <option value="" disabled>
                Select availability
              </option>
              <option value="Public">Public</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>

          {/* User Info */}
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label className="block text-base font-semibold text-green-900 mb-3 raleway">
                Your Email
              </label>
              <input
                type="text"
                name="email"
                readOnly
                value={user?.email || ""}
                className="w-full rounded-2xl bg-green-100 border border-green-300 px-6 py-4 text-green-700 cursor-not-allowed shadow-inner"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-green-900 mb-3 raleway">
                Your Name
              </label>
              <input
                type="text"
                name="displayName"
                readOnly
                value={user?.displayName || ""}
                className="w-full rounded-2xl bg-green-100 border border-green-300 px-6 py-4 text-green-700 cursor-not-allowed shadow-inner"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold px-14 py-4 rounded-full shadow-xl transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-6 focus:ring-green-400"
            >
              Updated
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTips;
