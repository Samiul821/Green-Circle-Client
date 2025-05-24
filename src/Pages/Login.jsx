import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { login, passwordReset, googleLogin } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("Login successful");
        navigate(`${location.state ? location.state : "/"}`, { replace: true });
      })
      .catch((error) => {
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
        .catch((error) => {
          toast.error("Error sending password reset email:", error);
        });
    } else {
      toast.error("Email address is required");
    }
  };

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const redirectPath = location?.state?.from?.pathname || "/";
        navigate(redirectPath, { replace: true });
        toast.success("Google Sign In Successful");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-100 to-pink-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full bg-white backdrop-blur-md bg-opacity-70 rounded-3xl shadow-2xl p-10 relative overflow-hidden"
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
          className="absolute top-[-60px] left-[-60px] w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
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
          className="absolute bottom-[-60px] right-[-60px] w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />

        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-wide font-serif">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div
            whileFocus={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="you@example.com"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
          </motion.div>

          <motion.div
            whileFocus={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
          </motion.div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="accent-indigo-600 w-5 h-5 rounded-md"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={handlePasswordReset}
              className="text-indigo-600 hover:underline focus:outline-none"
            >
              Forgot password?
            </button>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Sign In
          </motion.button>
        </form>

        {/* Google Sign In Button */}
        <div className="mt-6">
          <motion.button
            onClick={handleGoogleSignIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </motion.button>
        </div>

        <p className="text-center text-gray-600 mt-8 text-sm">
          Don't have an account?{" "}
          <Link
            to="/auth/signUp"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
