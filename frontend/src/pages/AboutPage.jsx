import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const About = () => {
  useEffect(() => {
    window.scrollTo(1, 0); // Scroll to top on mount
  }, []);

  return (
   <motion.div
  className="pt-24 px-4 sm:px-8 md:px-16 py-10 max-w-7xl mx-auto animate-fadeIn"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 font-playfair">
          About QuickStay
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          Your trusted companion for comfortable, convenient, and quick hotel room bookings across India. Discover your perfect stay with us!
        </p>
      </div>

      {/* Image + Text Section */}
      <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
        <img
          src={assets.aboutHeroImage}
          alt="QuickStay Preview"
          className="w-full md:w-1/2 h-80 object-cover rounded-xl shadow-md"
        />
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">Why Choose QuickStay?</h2>
          <p className="text-gray-600">
            At QuickStay, we believe booking a hotel room should be simple and stress-free. Whether you're planning a business trip, a family vacation, or a weekend getaway, we offer handpicked hotels with flexible options and transparent pricing.
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Wide range of verified hotels & rooms</li>
            <li>Instant booking & secure payments</li>
            <li>24/7 customer support</li>
            <li>Special offers for members</li>
          </ul>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
        <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <img src={assets.roomIcon} alt="Room" className="mx-auto h-12 mb-4" />
          <h3 className="text-lg font-semibold text-blue-800">Easy Booking</h3>
          <p className="text-gray-600 mt-2">Book your favorite rooms in seconds with just a few clicks.</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <img src={assets.paymentIcon} alt="Payment" className="mx-auto h-12 mb-4" />
          <h3 className="text-lg font-semibold text-green-800">Secure Payments</h3>
          <p className="text-gray-600 mt-2">Integrated Razorpay support for safe & quick transactions.</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <img src={assets.supportIcon} alt="Support" className="mx-auto h-12 mb-4" />
          <h3 className="text-lg font-semibold text-yellow-700">24/7 Support</h3>
          <p className="text-gray-600 mt-2">Our support team is always ready to assist you anytime.</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-blue-100 py-10 px-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Ready to book your next stay?</h2>
        <p className="text-gray-700 mb-6">Explore thousands of rooms and offers waiting for you.</p>
        <Link to="/rooms">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
            Browse Rooms
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default About;
