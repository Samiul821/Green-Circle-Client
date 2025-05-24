import React from "react";
import { FaUsers, FaTree, FaGlobeAmericas, FaRecycle } from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const achievements = [
  {
    icon: <FaUsers />,
    title: "Volunteers",
    count: 5000,
    suffix: "+",
    description: "Active volunteers supporting sustainability.",
  },
  {
    icon: <FaTree />,
    title: "Trees Planted",
    count: 120000,
    suffix: "+",
    description: "Trees planted across the country.",
  },
  {
    icon: <FaGlobeAmericas />,
    title: "Countries Reached",
    count: 15,
    suffix: "+",
    description: "Our impact spans over 15 countries.",
  },
  {
    icon: <FaRecycle />,
    title: "Waste Recycled",
    count: 300,
    suffix: " Tons",
    description: "Waste converted into reusable materials.",
  },
];

const OurAchievements = () => {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12">
        Our <span className="text-green-600">Achievements</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {achievements.map((item, index) => {
          const { ref, inView } = useInView({
            threshold: 0.5,
            triggerOnce: false, 
          });

          return (
            <motion.div
              key={index}
              ref={ref}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-4xl text-green-600 mb-4">{item.icon}</div>
              <h3 className="text-3xl font-bold text-green-700">
                {inView ? (
                  <CountUp end={item.count} duration={2} separator="," />
                ) : (
                  "0"
                )}
                {item.suffix}
              </h3>
              <p className="text-lg text-gray-600 font-semibold mt-1">{item.title}</p>
              <p className="text-sm text-gray-500 mt-2">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default OurAchievements;
