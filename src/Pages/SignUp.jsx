import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const { createUser, updateUser, setUser, googleLogin } =
    useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, name, photoURL, ...restFormData } =
      Object.fromEntries(formData.entries());

    // Password validations
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      toast.error("Password must contain at least one special character.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // Update user profile
        updateUser({ displayName: name, photoURL: photoURL }).then(() => {
          setUser({ ...user, displayName: name, photoURL: photoURL });
          navigate(location.state?.from?.pathname || "/", { replace: true });
        });

        const userProfile = {
          email,
          name,
          ...restFormData,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        // save user profile to the database
        fetch("https://green-circle-server-indol.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              toast.success("Sign Up successfully!");
            }
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        toast.error("Failed to create user");
      });
  };

  const handleGoogleSignIn = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;

        const userProfile = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        };

        try {
          // Check if user already exists
          const checkRes = await fetch(
            `https://green-circle-server-indol.vercel.app/users?email=${user.email}`
          );
          const existingUsers = await checkRes.json();

          if (existingUsers.length === 0) {
            // ইউজার নেই, তাই ইনসার্ট করো
            const insertRes = await fetch(
              "https://green-circle-server-indol.vercel.app/users",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userProfile),
              }
            );
            const insertData = await insertRes.json();

            if (insertData.insertedId) {
              toast.success("User registered successfully!");
            }
          } else {
            toast.info("Welcome back!");
          }

          // Redirect
          const redirectPath = location?.state?.from?.pathname || "/";
          navigate(redirectPath, { replace: true });
        } catch (error) {
          console.error(error);
          toast.error("Failed to process user data");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Helmet>
        <title>Sign Up | Green Circle</title>
      </Helmet>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6 relative overflow-hidden
          backdrop-blur-md bg-opacity-70
          ${isDark ? "bg-gray-800 text-green-300" : "bg-white text-gray-900"}
        `}
      >
        {/* Background floating blobs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
          className={`absolute top-[-50px] left-[-40px] w-36 h-36 rounded-full mix-blend-multiply filter blur-xl opacity-60 ${
            isDark ? "bg-blue-700" : "bg-blue-300"
          }`}
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 9,
            ease: "easeInOut",
            delay: 3,
          }}
          className={`absolute bottom-[-50px] right-[-40px] w-36 h-36 rounded-full mix-blend-multiply filter blur-xl opacity-60 ${
            isDark ? "bg-blue-800" : "bg-blue-400"
          }`}
        />

        <h2
          className={`text-2xl font-bold text-center relative z-10 ${
            isDark ? "text-green-400" : "text-gray-800"
          }`}
        >
          Create Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4 relative z-10">
          {["name", "email", "photoURL", "password"].map((field) => {
            const placeholders = {
              name: "Your Name",
              email: "you@example.com",
              photoURL: "https://example.com/photo.jpg",
              password: "••••••••",
            };
            const types = {
              name: "text",
              email: "email",
              photoURL: "url",
              password: "password",
            };
            const labels = {
              name: "Name",
              email: "Email",
              photoURL: "Photo URL",
              password: "Password",
            };

            return (
              <motion.div
                key={field}
                whileFocus={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label
                  className={`block text-sm font-medium ${
                    isDark ? "text-green-300" : "text-gray-700"
                  }`}
                >
                  {labels[field]}
                </label>
                <input
                  type={types[field]}
                  name={field}
                  placeholder={placeholders[field]}
                  required
                  className={`mt-1 w-full px-4 py-2 rounded-xl border
                    focus:outline-none focus:ring-2 transition
                    ${
                      isDark
                        ? "border-green-700 bg-gray-700 text-green-300 placeholder-green-400 focus:ring-green-500 focus:border-green-500"
                        : "border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400"
                    }
                  `}
                />
              </motion.div>
            );
          })}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`w-full rounded-xl py-2 font-semibold transition
              ${
                isDark
                  ? "bg-green-700 hover:bg-green-800 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            `}
          >
            Sign Up
          </motion.button>
        </form>

        {/* Google Sign In Button */}
        <div className="mt-6 relative z-10">
          <motion.button
            onClick={handleGoogleSignIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`w-full flex items-center justify-center gap-3 rounded-xl py-3 font-semibold shadow-lg focus:outline-none focus:ring-4 transition
              ${
                isDark
                  ? "bg-green-700 hover:bg-green-800 text-white focus:ring-green-400"
                  : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-300"
              }
            `}
          >
            <FcGoogle size={20} />
            Sign in with Google
          </motion.button>
        </div>

        <p
          className={`text-sm text-center relative z-10 ${
            isDark ? "text-green-400" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className={`hover:underline font-semibold ${
              isDark ? "text-green-400" : "text-blue-600"
            }`}
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
