import React, { useEffect, useState } from 'react';
import HotelCard from './HotelCard';
import Title from './Title';
import { useAppContext } from '../context/AppContext';

const RecommendedHotels = () => {
  const { rooms,searchedCities } = useAppContext();
  const [recommended,setRecommended] = useState([])

  const filterHotels = ()=>{
    const filteredHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city));
    setRecommended(filteredHotels);
  }

  // Ensure rooms are fetched if not already
  useEffect(() => {
    filterHotels()
  }, [rooms, searchedCities]);



  return recommended.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title
        title='Recommended Hotels'
        subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences'
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 w-full'>
        {recommended.slice(0, 4).map((room, index) => (
          <div
            key={room._id}
            className='transform transition duration-300 hover:-translate-y-2 hover:shadow-xl'
          >
            <HotelCard room={room} index={index} />
          </div>
        ))}
      </div>
      
       
    </div>
  );
};

export default RecommendedHotels;
