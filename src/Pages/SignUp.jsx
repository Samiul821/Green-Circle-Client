import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const { createUser, updateUser, setUser, googleLogin } = use(AuthContext);
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
          navigate(location.state || "/", { replace: true });
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
              toast.success("Sign Up successfully:", data);
            }
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 relative overflow-hidden"
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
          className="absolute top-[-50px] left-[-40px] w-36 h-36 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-60"
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
          className="absolute bottom-[-50px] right-[-40px] w-36 h-36 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-60"
        />

        <h2 className="text-2xl font-bold text-gray-800 text-center relative z-10">
          Create Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4 relative z-10">
          {["name", "email", "photoURL", "password"].map((field, idx) => {
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
                <label className="block text-sm font-medium text-gray-700">
                  {labels[field]}
                </label>
                <input
                  type={types[field]}
                  name={field}
                  placeholder={placeholders[field]}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                />
              </motion.div>
            );
          })}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all"
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
            className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </motion.button>
        </div>

        <p className="text-sm text-center text-gray-600 relative z-10">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
