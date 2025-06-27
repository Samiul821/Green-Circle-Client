import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../Provider/ThemeContext";

const GardenTip = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value.trim();
    const plantType = form.plantType.value.trim();
    const difficulty = form.difficulty.value;
    const category = form.category.value;
    const description = form.description.value.trim();
    const image = form.image.value.trim();
    const availability = form.availability.value;

    if (
      !title ||
      !plantType ||
      !difficulty ||
      !category ||
      !description ||
      !image ||
      !availability
    ) {
      toast.error("Please fill all the required fields!");
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch("https://green-circle-server-indol.vercel.app/gardenTips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Tip submitted successfully!");
          form.reset();
        } else {
          toast.error("Failed to submit tip.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while submitting the tip.");
      });
  };

  return (
    <div
      className={`min-h-screen py-16 px-6 sm:px-12 lg:px-20 nunito ${
        isDark ? "bg-gray-900 text-green-300" : "bg-green-50 text-green-900"
      }`}
    >
      <Helmet>
        <title>Share a Garden Tip | Green Circle</title>
      </Helmet>

      <div
        className={`max-w-3xl mx-auto rounded-3xl p-10 border ${
          isDark
            ? "bg-gray-800 border-gray-700 shadow-lg"
            : "bg-white border-green-200 shadow-md"
        }`}
      >
        <h1
          className={`text-4xl font-extrabold mb-10 text-center tracking-wide playfair ${
            isDark ? "text-green-400" : "text-green-900"
          }`}
        >
          Share a Garden Tip
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label
              className={`block text-base font-semibold mb-3 raleway ${
                isDark ? "text-green-300" : "text-green-900"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="How I Grow Tomatoes Indoors"
              className={`w-full rounded-xl border px-5 py-3 placeholder-green-500 focus:outline-none focus:ring-2 shadow-sm transition ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-green-200 focus:ring-green-400"
                  : "border-green-400 text-green-900 focus:ring-green-500 bg-white"
              }`}
            />
          </div>

          {/* Plant Type */}
          <div>
            <label
              className={`block text-base font-semibold mb-3 raleway ${
                isDark ? "text-green-300" : "text-green-900"
              }`}
            >
              Plant Type / Topic
            </label>
            <input
              type="text"
              name="plantType"
              required
              className={`w-full rounded-xl border px-5 py-3 placeholder-green-500 focus:outline-none focus:ring-2 shadow-sm transition ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-green-200 focus:ring-green-400"
                  : "border-green-400 text-green-900 focus:ring-green-500 bg-white"
              }`}
            />
          </div>

          {/* Difficulty & Category */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                className={`block text-base font-semibold mb-3 raleway ${
                  isDark ? "text-green-300" : "text-green-900"
                }`}
              >
                Difficulty Level
              </label>
              <select
                name="difficulty"
                required
                defaultValue=""
                className={`w-full rounded-xl border px-5 py-3 focus:outline-none focus:ring-2 shadow-sm transition ${
                  isDark
                    ? "border-gray-600 bg-gray-700 text-green-200 focus:ring-green-400"
                    : "border-green-400 text-green-900 focus:ring-green-500 bg-white"
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
                  isDark ? "text-green-300" : "text-green-900"
                }`}
              >
                Category
              </label>
              <select
                name="category"
                required
                defaultValue=""
                className={`w-full rounded-xl border px-5 py-3 focus:outline-none focus:ring-2 shadow-sm transition ${
                  isDark
                    ? "border-gray-600 bg-gray-700 text-green-200 focus:ring-green-400"
                    : "border-green-400 text-green-900 focus:ring-green-500 bg-white"
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
                isDark ? "text-green-300" : "text-green-900"
              }`}
            >
              Description
            </label>
            <textarea
              name="description"
              rows="6"
              required
              placeholder="Write your detailed tip here..."
              className={`w-full rounded-xl border px-5 py-3 placeholder-green-500 focus:outline-none focus:ring-2 shadow-sm transition resize-none ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-green-200 focus:ring-green-400"
                  : "border-green-400 text-green-900 focus:ring-green-500 bg-white"
              }`}
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label
              className={`block text-base font-semibold mb-3 raleway ${
                isDark ? "text-green-300" : "text-green-900"
              }`}
            >
              Image URL
            </label>
            <input
              type="url"
              name="image"
              required
              placeholder="https://example.com/image.jpg"
              className={`w-full rounded-xl border px-5 py-3 placeholder-green-500 focus:outline-none focus:ring-2 shadow-sm transition ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-green-200 focus:ring-green-400"
                  : "border-green-400 text-green-900 focus:ring-green-500 bg-white"
              }`}
            />
          </div>

          {/* Availability */}
          <div>
            <label
              className={`block text-base font-semibold mb-3 raleway ${
                isDark ? "text-green-300" : "text-green-900"
              }`}
            >
              Availability
            </label>
            <select
              name="availability"
              required
              defaultValue=""
              className={`w-full rounded-xl border px-5 py-3 focus:outline-none focus:ring-2 shadow-sm transition ${
                isDark
                  ? "border-gray-600 bg-gray-700 text-green-200 focus:ring-green-400"
                  : "border-green-400 text-green-900 focus:ring-green-500 bg-white"
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
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                className={`block text-base font-semibold mb-3 raleway ${
                  isDark ? "text-green-300" : "text-green-900"
                }`}
              >
                Your Email
              </label>
              <input
                type="text"
                name="email"
                readOnly
                value={user?.email || ""}
                className={`w-full rounded-xl px-5 py-3 cursor-not-allowed shadow-inner ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-green-400"
                    : "bg-green-100 border-green-300 text-green-700"
                }`}
              />
            </div>

            <div>
              <label
                className={`block text-base font-semibold mb-3 raleway ${
                  isDark ? "text-green-300" : "text-green-900"
                }`}
              >
                Your Name
              </label>
              <input
                type="text"
                name="displayName"
                readOnly
                value={user?.displayName || ""}
                className={`w-full rounded-xl px-5 py-3 cursor-not-allowed shadow-inner ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-green-400"
                    : "bg-green-100 border-green-300 text-green-700"
                }`}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold px-14 py-4 rounded-full shadow-md transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-400"
            >
              Submit Tip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GardenTip;
