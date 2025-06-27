import React, { useContext } from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { ThemeContext } from "../Provider/ThemeContext";

const experts = [
  {
    name: "Dr. Nafisa Rahman",
    role: "Environmental Scientist",
    img: "https://i.ibb.co/hRMy71XH/download-9.jpg",
    facebook: "https://www.facebook.com/smsamiul890",
    linkedin: "https://www.linkedin.com/in/samiul-islam-40942a34a",
    twitter: "https://x.com/SmSamiul890",
    experience: "10+ years",
  },
  {
    name: "Engr. Akash Hossain",
    role: "Sustainable Architect",
    img: "https://i.ibb.co/qYhJJhqm/download-10.jpg",
    facebook: "https://www.facebook.com/smsamiul890",
    linkedin: "https://www.linkedin.com/in/samiul-islam-40942a34a",
    twitter: "https://x.com/SmSamiul890",
    experience: "8+ years",
  },
  {
    name: "Tania Islam",
    role: "Green Energy Specialist",
    img: "https://i.ibb.co/hFDxmPws/download-11.jpg",
    facebook: "https://www.facebook.com/smsamiul890",
    linkedin: "https://www.linkedin.com/in/samiul-islam-40942a34a",
    twitter: "https://x.com/SmSamiul890",
    experience: "6+ years",
  },
  {
    name: "Prof. Mahmudul Karim",
    role: "Climate Policy Advisor",
    img: "https://i.ibb.co/NdyzKjzm/download-12.jpg",
    facebook: "https://www.facebook.com/smsamiul890",
    linkedin: "https://www.linkedin.com/in/samiul-islam-40942a34a",
    twitter: "https://x.com/SmSamiul890",
    experience: "15+ years",
  },
  {
    name: "Sarah Noor",
    role: "Environmental Educator",
    img: "https://i.ibb.co/wNn9HszR/download-13.jpg",
    facebook: "https://www.facebook.com/smsamiul890",
    linkedin: "https://www.linkedin.com/in/samiul-islam-40942a34a",
    twitter: "https://x.com/SmSamiul890",
    experience: "7+ years",
  },
  {
    name: "Imran Chowdhury",
    role: "Renewable Energy Engineer",
    img: "https://i.ibb.co/szSFC35/download-14.jpg",
    facebook: "https://www.facebook.com/smsamiul890",
    linkedin: "https://www.linkedin.com/in/samiul-islam-40942a34a",
    twitter: "https://x.com/SmSamiul890",
    experience: "9+ years",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, type: "spring" },
  }),
};

const OurExpert = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <section>
      <h2
        className={`text-4xl font-bold text-center mb-12 ${
          isDark ? "text-green-300" : "text-green-800"
        }`}
      >
        Meet Our Experts
      </h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {experts.map((expert, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-2xl shadow-xl text-center border transition-transform duration-300 hover:scale-105
              ${
                isDark
                  ? "bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-100 border border-gray-700"
                  : "bg-white border-green-100 text-green-900"
              }
            `}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <img
              src={expert.img}
              alt={expert.name}
              className={`w-32 h-32 mx-auto rounded-full object-cover border-4 ${
                isDark ? "border-green-600" : "border-green-200"
              }`}
            />
            <h3 className="text-xl font-semibold mt-4">{expert.name}</h3>
            <p
              className={`text-sm mt-1 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {expert.role}
            </p>
            <p
              className={`text-sm font-medium mt-1 ${
                isDark ? "text-green-400" : "text-green-600"
              }`}
            >
              {expert.experience}
            </p>
            <div className="flex justify-center mt-4 space-x-4 text-xl">
              <a
                href={expert.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={
                  isDark
                    ? "text-green-400 hover:text-green-600"
                    : "text-green-600 hover:text-green-800"
                }
              >
                <FaFacebook />
              </a>
              <a
                href={expert.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={
                  isDark
                    ? "text-green-400 hover:text-green-600"
                    : "text-green-600 hover:text-green-800"
                }
              >
                <FaLinkedin />
              </a>
              <a
                href={expert.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={
                  isDark
                    ? "text-green-400 hover:text-green-600"
                    : "text-green-600 hover:text-green-800"
                }
              >
                <FaTwitter />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurExpert;
