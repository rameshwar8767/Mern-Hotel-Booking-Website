import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const HotelCard = ({ room, index }) => {
  if (!room || !room._id || !room.hotel || !room.images) {
    return null;
  }

  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => scrollTo(0, 0)}
      className="block group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <img
          src={room.images[0]}
          alt="Hotel"
          className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {index % 2 === 0 && (
          <p className="absolute top-3 left-3 bg-white text-gray-800 text-xs px-3 py-1 rounded-full font-semibold shadow">
            Best Seller
          </p>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-playfair text-xl font-semibold text-gray-800">
            {room.hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-yellow-500">
            <img src={assets.starIconFilled} alt="star" className="h-4" />
            4.5
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <img src={assets.locationIcon} alt="location" className="h-4" />
          <span>{room.hotel.address}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-semibold text-gray-800">
            ₹{room.pricePerDay}{' '}
            <span className="text-sm font-normal text-gray-500">/ day</span>
          </span>
          <button className="px-4 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
