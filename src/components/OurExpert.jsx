import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const experts = [
  {
    name: "Dr. Nafisa Rahman",
    role: "Environmental Scientist",
    img: "https://i.ibb.co/ZVh01GM/expert1.jpg",
    facebook: "#",
    linkedin: "#",
    twitter: "#",
    experience: "10+ years",
  },
  {
    name: "Engr. Akash Hossain",
    role: "Sustainable Architect",
    img: "https://i.ibb.co/4djWjKf/expert2.jpg",
    facebook: "#",
    linkedin: "#",
    twitter: "#",
    experience: "8+ years",
  },
  {
    name: "Tania Islam",
    role: "Green Energy Specialist",
    img: "https://i.ibb.co/0M1P3gc/expert3.jpg",
    facebook: "#",
    linkedin: "#",
    twitter: "#",
    experience: "6+ years",
  },
  {
    name: "Prof. Mahmudul Karim",
    role: "Climate Policy Advisor",
    img: "https://i.ibb.co/zSddXTv/expert4.jpg",
    facebook: "#",
    linkedin: "#",
    twitter: "#",
    experience: "15+ years",
  },
  {
    name: "Sarah Noor",
    role: "Environmental Educator",
    img: "https://i.ibb.co/yR7jBWC/expert5.jpg",
    facebook: "#",
    linkedin: "#",
    twitter: "#",
    experience: "7+ years",
  },
  {
    name: "Imran Chowdhury",
    role: "Renewable Energy Engineer",
    img: "https://i.ibb.co/fFtXNNc/expert6.jpg",
    facebook: "#",
    linkedin: "#",
    twitter: "#",
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
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
        Meet Our Experts
      </h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {experts.map((expert, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-xl text-center border border-green-100 hover:scale-105 transition-transform duration-300"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <img
              src={expert.img}
              alt={expert.name}
              className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-green-200"
            />
            <h3 className="text-xl font-semibold text-green-700 mt-4">
              {expert.name}
            </h3>
            <p className="text-sm text-gray-500">{expert.role}</p>
            <p className="text-sm text-green-600 font-medium mt-1">
              {expert.experience}
            </p>
            <div className="flex justify-center mt-4 space-x-4 text-green-600 text-xl">
              <a href={expert.facebook} aria-label="Facebook">
                <FaFacebook className="hover:text-green-800 transition" />
              </a>
              <a href={expert.linkedin} aria-label="LinkedIn">
                <FaLinkedin className="hover:text-green-800 transition" />
              </a>
              <a href={expert.twitter} aria-label="Twitter">
                <FaTwitter className="hover:text-green-800 transition" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurExpert;
