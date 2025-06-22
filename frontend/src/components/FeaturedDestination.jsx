import React from 'react';
import { roomsDummyData } from '../assets/assets';
import HotelCard from './HotelCard';
import Title from './Title';
import { useNavigate } from 'react-router-dom';


const FeaturedDestination = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      {/* <h2 className='text-3xl md:text-4xl font-semibold text-gray-800 mb-8 transition-all duration-500'>
        Featured Destinations
      </h2> */}
      <Title title='Featured Destination' subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences"/>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 w-full'>
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <div
            key={room._id}
            className='transform transition duration-300 hover:-translate-y-2 hover:shadow-xl'
          >
            <HotelCard room={room} index={index} />
          </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}} className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
        View All Destinations
      </button>
    </div>
  );
};

export default FeaturedDestination;
