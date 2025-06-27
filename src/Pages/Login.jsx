import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { login, passwordReset, googleLogin } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then(() => {
        toast.success("Login successful");
        navigate(location.state?.from?.pathname || "/", { replace: true });
      })
      .catch(() => {
        toast.error("Invalid email or password");
      });
  };

  const handlePasswordReset = () => {
    const email = prompt("Please enter your email address:");
    if (email) {
      passwordReset(email)
        .then(() => {
          toast.success("Password reset email sent");
        })
        .catch(() => {
          toast.error("Error sending password reset email");
        });
    } else {
      toast.error("Email address is required");
    }
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
          const checkRes = await fetch(
            `https://green-circle-server-indol.vercel.app/users?email=${user.email}`
          );
          const existingUsers = await checkRes.json();

          if (existingUsers.length === 0) {
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
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Helmet>
        <title>Login | Green Circle</title>
      </Helmet>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`max-w-md w-full rounded-3xl shadow-2xl p-10 relative overflow-hidden
          backdrop-blur-md bg-opacity-70
          ${
            isDark
              ? "bg-gray-800 text-green-300"
              : "bg-white text-gray-900"
          }
        `}
      >
        {/* Decorative Circles */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
          }}
          className="absolute top-[-60px] left-[-60px] w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-50"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[-60px] right-[-60px] w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-50"
        />

        <h2
          className={`text-4xl font-extrabold text-center mb-8 tracking-wide font-serif ${
            isDark ? "text-green-400" : "text-gray-800"
          }`}
        >
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div
            whileFocus={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label
              htmlFor="email"
              className={`block mb-2 text-sm font-medium ${
                isDark ? "text-green-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="you@example.com"
              className={`w-full px-5 py-3 rounded-xl border
                ${
                  isDark
                    ? "border-green-700 bg-gray-700 text-green-300 placeholder-green-400 focus:ring-green-500 focus:border-green-500"
                    : "border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-400"
                }
                focus:outline-none transition`}
            />
          </motion.div>

          <motion.div
            whileFocus={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label
              htmlFor="password"
              className={`block mb-2 text-sm font-medium ${
                isDark ? "text-green-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="••••••••"
              className={`w-full px-5 py-3 rounded-xl border
                ${
                  isDark
                    ? "border-green-700 bg-gray-700 text-green-300 placeholder-green-400 focus:ring-green-500 focus:border-green-500"
                    : "border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-400"
                }
                focus:outline-none transition`}
            />
          </motion.div>

          <div
            className={`flex items-center justify-between text-sm ${
              isDark ? "text-green-300" : "text-gray-600"
            }`}
          >
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className={`w-5 h-5 rounded-md ${
                  isDark ? "accent-green-500" : "accent-indigo-600"
                }`}
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={handlePasswordReset}
              className={`hover:underline focus:outline-none ${
                isDark ? "text-green-400" : "text-indigo-600"
              }`}
            >
              Forgot password?
            </button>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`w-full font-semibold py-3 rounded-xl shadow-lg focus:outline-none focus:ring-4 ${
              isDark
                ? "bg-green-700 hover:bg-green-800 text-white focus:ring-green-400"
                : "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-300"
            }`}
          >
            Sign In
          </motion.button>
        </form>

        <div className="mt-6">
          <motion.button
            onClick={handleGoogleSignIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`w-full flex items-center justify-center gap-3 font-semibold py-3 rounded-xl shadow-lg focus:outline-none focus:ring-4 ${
              isDark
                ? "bg-green-700 hover:bg-green-800 text-white focus:ring-green-400"
                : "bg-green-600 hover:bg-green-700 text-white focus:ring-green-300"
            }`}
          >
            <FcGoogle size={20} />
            Sign in with Google
          </motion.button>
        </div>

        <p
          className={`text-center mt-8 text-sm ${
            isDark ? "text-green-400" : "text-gray-600"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to="/auth/signUp"
            className={`font-semibold hover:underline ${
              isDark ? "text-green-400" : "text-indigo-600"
            }`}
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
