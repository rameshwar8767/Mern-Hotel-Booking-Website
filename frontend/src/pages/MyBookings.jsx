import React, { useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const MyBookings = () => {

  const {axios, getToken,user} = useAppContext()
  const [bookings, setBookings] = useState([]);

  const fetchUserBookings = async () => {
    try {
      const {data } = await axios.get('/api/bookings/user',{headers: {Authorization: `Bearer ${await getToken()}`}})
      if(data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching bookings");
      console.error("Error fetching bookings:", error);
    }
  }

  useEffect(()=>{
    if(user) {
      fetchUserBookings();
    }
  }, [user]);

  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 bg-white'>
      <Title
        title='My Bookings'
        subTitle='Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks'
        align='left'
      />

      <div className='max-w-6xl mt-8 w-full text-gray-800'>
        {/* Header Row */}
        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
          <div>Hotels</div>
          <div>Date & Timings</div>
          <div>Payment</div>
        </div>

        {/* Booking Entries */}
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className='group grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t transition-all duration-300 hover:bg-gray-50'
          >
            {/* Hotel Details */}
            <div className='flex flex-col md:flex-row gap-4'>
              <img
                src={booking.room.images[0]}
                alt={booking.hotel.name}
                className='md:w-44 h-32 rounded shadow-sm object-cover group-hover:scale-105 transition-transform duration-300'
                onError={(e) => (e.target.src = assets.defaultImage || '')}
              />
              <div className='flex flex-col gap-1.5'>
                <p className='font-playfair text-xl md:text-2xl'>
                  {booking.hotel.name}
                  <span className='font-inter text-sm text-gray-600'> ({booking.room.roomType})</span>
                </p>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <img src={assets.locationIcon} alt="Location" className='w-4 h-4' />
                  <span>{booking.hotel.address}</span>
                </div>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                  <img src={assets.guestsIcon} alt="Guests" className='w-4 h-4' />
                  <span>{booking.guests} Guests</span>
                </div>
                <p className='text-base font-medium mt-1'>Total: ₹{booking.totalPrice}</p>
              </div>
            </div>

            {/* Date & Timings */}
            <div className='flex flex-row md:items-center md:gap-12 mt-4 md:mt-0 gap-8 text-sm'>
              <div>
                <p className='font-medium'>Check-In</p>
                <p className='text-gray-500'>{new Date(booking.checkInDate).toDateString()}</p>
              </div>
              <div>
                <p className='font-medium'>Check-Out</p>
                <p className='text-gray-500'>{new Date(booking.checkOutDate).toDateString()}</p>
              </div>
            </div>

            {/* Payment Status */}
            <div className='flex flex-col items-start justify-center pt-3'>
              <div className='flex items-center gap-2'>
                <div className={`h-3 w-3 rounded-full ${booking.isPaid ? "bg-green-500" : "bg-red-500"}`}></div>
                <p className={`text-sm font-medium ${booking.isPaid ? "text-green-600" : "text-red-600"}`}>
                  {booking.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>
              {!booking.isPaid && (
                <button className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-100 transition-all'>
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
