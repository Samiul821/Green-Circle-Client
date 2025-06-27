import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeContext"; // ধরে নিলাম তুমি ThemeContext বানিয়েছো
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UpdateTips = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);

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

    fetch(`https://green-circle-server-indol.vercel.app/gardenTips/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTip),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Tip updated successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div
      className={`min-h-screen py-16 px-6 sm:px-12 lg:px-20 nunito ${
        isDark ? "bg-gray-900 text-green-300" : "bg-green-50 text-green-900"
      }`}
    >
      <Helmet>
        <title>Update Garden Tip | Green Circle</title>
      </Helmet>

      <div
        className={`max-w-3xl mx-auto rounded-3xl p-12 sm:p-16 shadow-xl border transition-colors ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-green-200"
        }`}
      >
        <h1
          className={`text-4xl font-extrabold mb-10 text-center tracking-wide playfair ${
            isDark ? "text-green-400" : "text-green-900"
          }`}
        >
          Update Garden Tip
        </h1>
        <form onSubmit={handleUpdate} className="space-y-8">
          {/* Title */}
          <div>
            <label
              className={`block text-base font-semibold mb-3 raleway ${
                isDark ? "text-green-400" : "text-green-900"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={title}
              required
              placeholder="How I Grow Tomatoes Indoors"
              className={`w-full rounded-2xl border px-6 py-4 placeholder-green-500 focus:outline-none focus:ring-4 shadow-sm transition ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-green-300 focus:ring-green-500"
                  : "border-green-400 text-green-900 focus:ring-green-300"
              }`}
            />
          </div>

          {/* Plant Type */}
          <div>
            <label
              className={`block text-base font-semibold mb-3 raleway ${
                isDark ? "text-green-400" : "text-green-900"
              }`}
            >
              Plant Type / Topic
            </label>
            <input
              type="text"
              name="plantType"
              defaultValue={plantType}
              required
              className={`w-full rounded-2xl border px-6 py-4 placeholder-green-500 focus:outline-none focus:ring-4 shadow-sm transition ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-green-300 focus:ring-green-500"
                  : "border-green-400 text-green-900 focus:ring-green-300"
              }`}
            />
          </div>

          {/* Difficulty & Category */}
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label
                className={`block text-base font-semibold mb-3 raleway ${
                  isDark ? "text-green-400" : "text-green-900"
                }`}
              >
                Difficulty Level
              </label>
              <select
                name="difficulty"
                required
                defaultValue={difficulty}
                className={`w-full rounded-2xl border px-6 py-4 focus:outline-none focus:ring-4 shadow-sm transition ${
                  isDark
                    ? "border-gray-600 bg-gray-700 text-green-300 focus:ring-green-500"
                    : "border-green-400 text-green-900 focus:ring-green-300"
                }`}
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
              <label
                className={`block text-base font-semibold mb-3 raleway ${
                  isDark ? "text-green-400" : "text-green-900"
                }`}
              >
                Category
              </label>
              <select
                name="category"
                required
                defaultValue={category}
                className={`w-full rounded-2xl border px-6 py-4 focus:outline-none focus:ring-4 shadow-sm transition ${
                  isDark
                    ? "border-gray-600 bg-gray-700 text-green-300 focus:ring-green-500"
                    : "border-green-400 text-green-900 focus:ring-green-300"
                }`}
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
            <label
              className={`block text-base font-semibold mb-3 raleway ${
                isDark ? "text-green-400" : "text-green-900"
              }`}
            >
              Description
            </label>
            <textarea
              name="description"
              defaultValue={description}
              rows="6"
              required
              placeholder="Write your detailed tip here..."
              className={`w-full rounded-2xl border px-6 py-4 placeholder-green-500 focus:outline-none focus:ring-4 shadow-sm transition resize-none ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-green-300 focus:ring-green-500"
                  : "border-green-400 text-green-900 focus:ring-green-300"
              }`}
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label
              className={`block text-base font-semibold mb-3 raleway ${
                isDark ? "text-green-400" : "text-green-900"
              }`}
            >
              Image URL
            </label>
            <input
              type="url"
              name="image"
              defaultValue={image}
              required
              placeholder="https://example.com/image.jpg"
              className={`w-full rounded-2xl border px-6 py-4 placeholder-green-500 focus:outline-none focus:ring-4 shadow-sm transition ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-green-300 focus:ring-green-500"
                  : "border-green-400 text-green-900 focus:ring-green-300"
              }`}
            />
          </div>

          {/* Availability */}
          <div>
            <label
              className={`block text-base font-semibold mb-3 raleway ${
                isDark ? "text-green-400" : "text-green-900"
              }`}
            >
              Availability
            </label>
            <select
              name="availability"
              required
              defaultValue={availability}
              className={`w-full rounded-2xl border px-6 py-4 focus:outline-none focus:ring-4 shadow-sm transition ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-green-300 focus:ring-green-500"
                  : "border-green-400 text-green-900 focus:ring-green-300"
              }`}
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
              <label
                className={`block text-base font-semibold mb-3 raleway ${
                  isDark ? "text-green-400" : "text-green-900"
                }`}
              >
                Your Email
              </label>
              <input
                type="text"
                name="email"
                readOnly
                value={user?.email || ""}
                className={`w-full rounded-2xl px-6 py-4 cursor-not-allowed shadow-inner ${
                  isDark
                    ? "bg-gray-700 border border-gray-600 text-green-400"
                    : "bg-green-100 border border-green-300 text-green-700"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-base font-semibold mb-3 raleway ${
                  isDark ? "text-green-400" : "text-green-900"
                }`}
              >
                Your Name
              </label>
              <input
                type="text"
                name="displayName"
                readOnly
                value={user?.displayName || ""}
                className={`w-full rounded-2xl px-6 py-4 cursor-not-allowed shadow-inner ${
                  isDark
                    ? "bg-gray-700 border border-gray-600 text-green-400"
                    : "bg-green-100 border border-green-300 text-green-700"
                }`}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold px-14 py-4 rounded-full shadow-xl transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-6 focus:ring-green-400"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTips;
