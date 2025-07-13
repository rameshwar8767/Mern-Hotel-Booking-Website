import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets'; // Ensure these experience images/icons are available

const experiences = [
  {
    title: "Luxurious Stays",
    description: "Enjoy thoughtfully designed rooms with plush bedding, smart controls, and stunning views.",
    icon: assets.luxuryIcon,
  },
  {
    title: "Scenic Destinations",
    description: "Choose stays near beaches, hills, or historic landmarks across India.",
    icon: assets.destinationIcon,
  },
  {
    title: "Wellness & Spa",
    description: "Relax with in-house spa treatments, yoga retreats, and wellness-focused amenities.",
    icon: assets.spaIcon,
  },
  {
    title: "Work-Friendly Rooms",
    description: "High-speed internet, ergonomic desks, and peaceful environments for productive stays.",
    icon: assets.workIcon,
  },
  {
    title: "Couple-Friendly",
    description: "Safe, discreet, and comfortable stays designed for couples.",
    icon: assets.coupleIcon,
  },
  {
    title: "Pet-Friendly Hotels",
    description: "Your furry friends are welcome! Book stays that allow pets with open arms.",
    icon: assets.petIcon,
  },
];

const ExperiencePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);

  return (
    <motion.div
      className="pt-24 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto animate-fadeIn"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 font-playfair">Experiences with QuickStay</h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Explore unique stay experiences tailored to your journey. Whether you're traveling for adventure, work, or relaxation—we’ve got something for you.
        </p>
      </div>

      {/* Experience Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            className="bg-white border border-gray-100 shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <img src={exp.icon} alt={exp.title} className="w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{exp.title}</h2>
            <p className="text-gray-600 text-sm">{exp.description}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-blue-100 to-blue-50 py-10 px-6 rounded-xl shadow-md mb-20">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Find your perfect experience today!</h2>
        <p className="text-gray-700 mb-6">From romantic getaways to peaceful retreats, QuickStay brings it all together.</p>
        <Link to="/rooms">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
            Browse Rooms
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ExperiencePage;
