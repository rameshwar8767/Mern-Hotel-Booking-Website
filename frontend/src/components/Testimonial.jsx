import React from 'react';
import Title from './Title';
import { testimonials } from '../assets/assets';
import StarRating from './StarRating';

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-28 bg-gradient-to-br from-slate-50 to-white">
      <Title 
        title="What Our Guests Say" 
        subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world." 
      />
      
      <div className="flex flex-wrap justify-center gap-8 mt-20">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <img 
                className="w-14 h-14 rounded-full border-2 border-blue-200" 
                src={testimonial.image} 
                alt={testimonial.name} 
              />
              <div>
                <p className="font-playfair text-lg font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-4">
              <StarRating />
            </div>

            <p className="text-gray-600 text-sm mt-4 italic leading-relaxed">
              “{testimonial.review}”
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
