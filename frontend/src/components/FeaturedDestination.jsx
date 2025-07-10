import React, { useEffect } from 'react';
import HotelCard from './HotelCard';
import Title from './Title';
import { useAppContext } from '../context/AppContext';

const FeaturedDestination = () => {
  const { rooms, navigate, fetchRooms } = useAppContext();

  // Ensure rooms are fetched if not already
  useEffect(() => {
    if (rooms.length === 0) {
      fetchRooms?.(); // optional chaining in case it's undefined
    }
  }, []);

  if (!rooms || rooms.length === 0) {
    return (
      <div className='px-6 py-16 text-center text-gray-500'>
        <p>Loading featured destinations...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title
        title='Featured Destination'
        subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences'
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 w-full'>
        {rooms.slice(0, 4).map((room, index) => (
          <div
            key={room._id}
            className='transform transition duration-300 hover:-translate-y-2 hover:shadow-xl'
          >
            <HotelCard room={room} index={index} />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate('/rooms');
          window.scrollTo(0, 0);
        }}
        className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'
      >
        View All Destinations
      </button>
    </div>
  );
};

export default FeaturedDestination;
