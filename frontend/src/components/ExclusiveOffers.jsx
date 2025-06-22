import React from 'react';
import Title from './Title';
import { assets, exclusiveOffers } from '../assets/assets';

const ExclusiveOffers = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-28 bg-slate-50'>
      {/* Header Row */}
      <div className='flex flex-col md:flex-row items-center justify-between w-full'>
        <Title
          align='left'
          title='Exclusive Offers'
          subTitle='Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories'
        />
        <button className='group flex items-center gap-2 font-medium text-gray-700 cursor-pointer max-md:mt-8 hover:text-black'>
          View All Offers
          <img
            src={assets.arrowIcon}
            className='h-4 transition-transform duration-300 group-hover:translate-x-1'
            alt=""
          />
        </button>
      </div>

      {/* Offer Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full'>
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className='group relative h-[360px] rounded-2xl overflow-hidden text-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-cover bg-center'
            style={{ backgroundImage: `url(${item.image})` }}
          >
            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0'></div>

            {/* Discount Badge */}
            <p className='absolute top-4 left-4 z-10 px-3 py-1 text-xs bg-white text-gray-900 font-semibold rounded-full'>
              {item.priceOff}% OFF
            </p>

            {/* Content */}
            <div className='relative z-10 p-6 h-full flex flex-col justify-end'>
              <h3 className='text-2xl font-semibold font-playfair mb-1'>{item.title}</h3>
              <p className='text-sm'>{item.description}</p>
              <p className='text-xs text-white/70 mt-2'>Expires {item.expiryDate}</p>

              <button className='flex items-center gap-2 mt-4 font-medium group-hover:text-white transition-all'>
                View Offers
                <img
                  className='h-4 invert group-hover:translate-x-1 transition-transform duration-300'
                  src={assets.arrowIcon}
                  alt=""
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
