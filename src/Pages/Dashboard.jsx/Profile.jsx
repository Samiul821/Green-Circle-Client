import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { ThemeContext } from "../../Provider/ThemeContext";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdateProfile = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser({
      displayName: name,
      email: email,
      photoURL: photoURL,
    })
      .then(() => {
        toast.success("Profile updated successfully!");
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        toast.error("Failed to update profile. Please try again.");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex items-center justify-center pt-12 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`rounded-3xl shadow-xl max-w-md w-full p-8 sm:p-12 relative
          ${
            isDark
              ? "bg-gray-800 bg-opacity-90 text-green-200 backdrop-blur-md"
              : "bg-white bg-opacity-90 text-green-900 backdrop-blur-md"
          }
        `}
      >
        <h1
          className={`text-4xl font-extrabold mb-8 text-center tracking-wide ${
            isDark ? "text-green-400" : "text-green-700"
          }`}
        >
          User Profile
        </h1>

        {user ? (
          <>
            {/* Profile Info */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: showForm ? 0.9 : 1 }}
              transition={{ duration: 0.3 }}
              aria-hidden={showForm}
              className="flex flex-col items-center space-y-6"
            >
              {/* Profile Image */}
              {photoURL ? (
                <motion.img
                  src={photoURL}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 shadow-lg"
                  style={{
                    borderColor: isDark ? "#22c55e" : "#4ade80",
                  }}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              ) : (
                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold select-none
                    ${
                      isDark
                        ? "bg-green-900 text-green-400"
                        : "bg-green-200 text-green-600"
                    }
                  `}
                >
                  {name ? name[0].toUpperCase() : "U"}
                </div>
              )}

              {/* Name & Email */}
              <div className="w-full text-center">
                <h2
                  className={`text-2xl font-semibold ${
                    isDark ? "text-green-400" : "text-green-800"
                  }`}
                >
                  {name || "No Name Provided"}
                </h2>
                <p
                  className={`text-sm mt-1 truncate ${
                    isDark ? "text-green-300" : "text-green-600"
                  }`}
                >
                  {email}
                </p>
              </div>

              {/* Update Profile Button */}
              <button
                onClick={handleUpdateProfile}
                className={`mt-6 font-semibold py-2 px-6 rounded-full shadow-lg transition
                  ${
                    isDark
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }
                `}
              >
                Update Profile
              </button>
            </motion.div>

            {/* Update Form with AnimatePresence */}
            <AnimatePresence>
              {showForm && (
                <motion.form
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onSubmit={handleSubmit}
                  className={`absolute inset-0 rounded-3xl p-8 flex flex-col justify-center space-y-6 shadow-lg
                    ${
                      isDark
                        ? "bg-gray-900 bg-opacity-95 text-green-200"
                        : "bg-white bg-opacity-95 text-green-900"
                    }
                  `}
                  aria-modal="true"
                >
                  <h2
                    className={`text-2xl font-bold text-center ${
                      isDark ? "text-green-400" : "text-green-700"
                    }`}
                  >
                    Update Profile
                  </h2>

                  {/* Name Field */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className={`mb-1 font-semibold ${
                        isDark ? "text-green-400" : "text-green-800"
                      }`}
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500
                        ${
                          isDark
                            ? "border-green-600 bg-gray-800 text-green-200"
                            : "border-green-300 bg-white text-green-900"
                        }
                      `}
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className={`mb-1 font-semibold ${
                        isDark ? "text-green-400" : "text-green-800"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500
                        ${
                          isDark
                            ? "border-green-600 bg-gray-800 text-green-200"
                            : "border-green-300 bg-white text-green-900"
                        }
                      `}
                      required
                    />
                  </div>

                  {/* Profile Photo URL Field */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="photoURL"
                      className={`mb-1 font-semibold ${
                        isDark ? "text-green-400" : "text-green-800"
                      }`}
                    >
                      Profile Photo URL
                    </label>
                    <input
                      id="photoURL"
                      type="url"
                      placeholder="Enter image URL"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500
                        ${
                          isDark
                            ? "border-green-600 bg-gray-800 text-green-200"
                            : "border-green-300 bg-white text-green-900"
                        }
                      `}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className={`px-4 py-2 rounded-full border text-green-600 hover:bg-green-100 transition
                        ${
                          isDark
                            ? "border-green-500 text-green-400 hover:bg-green-700 hover:text-green-300"
                            : "border-green-600 text-green-600 hover:bg-green-100"
                        }
                      `}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition`}
                    >
                      Save
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </>
        ) : (
          <p className="text-center text-red-500 font-medium">
            User not logged in.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
