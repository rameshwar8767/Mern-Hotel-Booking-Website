import React, { useState } from 'react';
import { assets, facilityIcons, roomsDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm transition-all duration-300 hover:scale-[1.01]'>
      <input
        type='checkbox'
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
        className='accent-blue-500 cursor-pointer'
      />
      <span className='font-light select-none'>{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm transition-all duration-300 hover:scale-[1.01]'>
      <input
        type='radio'
        checked={selected}
        name='sortOption'
        onChange={() => onChange(label)}
        className='accent-blue-500 cursor-pointer'
      />
      <span className='font-light select-none'>{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false); // FIXED useState
  const roomTypes = [
    'Single Room',
    'Double Room',
    'Deluxe Room',
    'Family Suite',
    'Executive Suite',
    'Presidential Suite',
    'Studio',
    'Villa',
    'Dormitory',
    'Cottage',
  ];
  const priceRanges = [
    'Below ₹1,000',
    '₹1,000 - ₹2,500',
    '₹2,500 - ₹5,000',
    '₹5,000 - ₹7,500',
    '₹7,500 - ₹10,000',
    '₹10,000 - ₹15,000',
    '₹15,000 - ₹20,000',
    'Above ₹20,000',
  ];

  const sortOptions = [
    'Price Low to High',
    'Price High to Low',
    'Most Popular',
    'Highest Rated',
    'Newest Arrivals',
  ];

  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 gap-8'>
      {/* Room List */}
      <div className='flex-1 w-full'>
        <div className='flex flex-col items-start text-left mb-6'>
          <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
          <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
          </p>
        </div>

        {roomsDummyData.map((room) => (
          <div
            key={room._id}
            className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0 group transition-all duration-300'
          >
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
              className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer transform group-hover:scale-105 transition-transform duration-300'
              src={room.images[0]}
              title='View Room Details'
              alt=''
            />
            <div className='md:w-1/2 flex flex-col gap-2'>
              <p className='text-gray-500'>{room.hotel.city}</p>
              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                className='text-gray-800 text-3xl font-playfair cursor-pointer hover:underline'
              >
                {room.hotel.name}
              </p>
              <div className='flex items-center'>
                <StarRating />
                <p className='ml-2'>200+ reviews</p>
              </div>
              <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                <img src={assets.locationIcon} alt='' />
                <span>{room.hotel.address}</span>
              </div>
              <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70 transition-all duration-200 hover:bg-indigo-100'
                  >
                    <img src={facilityIcons[item]} alt='' className='w-5 h-5' />
                    <p className='text-xs'>{item}</p>
                  </div>
                ))}
              </div>
              <p className='text-xl font-medium text-gray-700'>₹{room.pricePerNight} /day</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className='bg-white w-full lg:w-80 border border-gray-300 text-gray-600 rounded-lg shadow-sm overflow-hidden'>
        <div className='flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50'>
          <p className='text-base font-semibold text-gray-800'>FILTERS</p>
          <div className='text-xs font-medium'>
            <span
              onClick={() => setOpenFilters(!openFilters)}
              className='lg:hidden cursor-pointer text-blue-600'
            >
              {openFilters ? 'HIDE' : 'SHOW'}
            </span>
            <span className='hidden lg:block cursor-pointer text-red-500 hover:underline'>
              CLEAR
            </span>
          </div>
        </div>

        <div
          className={`transition-all duration-700 ease-in-out ${
            openFilters ? 'h-auto' : 'h-0 lg:h-auto'
          } overflow-hidden lg:overflow-visible`}
        >
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Room Types</p>
            {roomTypes.map((room, index) => (
              <CheckBox key={index} label={room} />
            ))}
          </div>
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox key={index} label={range} />
            ))}
          </div>
          <div className='px-5 pt-5 pb-7'>
            <p className='font-medium text-gray-800 pb-2'>Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton key={index} label={option} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
