import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, facilityIcons, roomCommonData } from '../assets/assets';
import StarRating from '../components/StarRating';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext'; // ✅ Access axios

const RoomDetails = () => {
  const { id } = useParams();
  const { axios } = useAppContext();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(`/api/rooms/${id}`);
        if (data.success && data.room) {
          setRoom(data.room);
          setMainImage(data.room.images[0]);
        } else {
          console.error('Room not found');
        }
      } catch (err) {
        console.error('Failed to fetch room details:', err);
      }
    };
    fetchRoom();
  }, [id]);
  

  return room ? (
    <motion.div
      className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Heading */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel.name}{' '}
          <span className="font-inter text-sm">({room.roomType})</span>
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>
      </div>

      {/* Rating & Address */}
      <div className="mt-2 space-y-2">
        <div className="flex items-center">
          <StarRating />
          <p className="ml-2 text-sm text-gray-600">200+ reviews</p>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span>{room.hotel.address}</span>
        </div>
      </div>

      {/* Main & Thumbnail Images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <motion.img
          src={mainImage}
          alt="Main room"
          className="w-full rounded-xl shadow-lg object-cover max-h-[450px]"
          key={mainImage}
          initial={{ opacity: 0.7, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room.images.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => setMainImage(img)}
              alt="Room thumbnail"
              className={`w-full h-32 rounded-xl object-cover cursor-pointer transition-all duration-300 hover:scale-105 ${
                mainImage === img ? 'outline outline-2 outline-orange-500' : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* Highlights + Price */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-playfair">Experience Luxury Like Never Before</h2>
          <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
            {room.amenities.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
              >
                <img className="w-5 h-5" src={facilityIcons[item]} alt={item} />
                <p className="text-xs">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-2xl font-medium mt-4 md:mt-0 text-primary">₹{room.pricePerDay}/night</p>
      </div>

      {/* Check-in/Checkout Form */}
      <form className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-xl p-6 rounded-xl mt-16 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-6 text-gray-700 w-full">
          <div>
            <label htmlFor="checkInDate" className="font-medium">Check In</label>
            <input type="date" id="checkInDate" className="w-full rounded border px-3 py-2 mt-1" required />
          </div>
          <div>
            <label htmlFor="checkOutDate" className="font-medium">Check Out</label>
            <input type="date" id="checkOutDate" className="w-full rounded border px-3 py-2 mt-1" required />
          </div>
          <div>
            <label htmlFor="guests" className="font-medium">Guests</label>
            <input type="number" id="guests" min={1} className="w-20 rounded border px-3 py-2 mt-1" required />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull transition-all text-white rounded-md mt-6 md:mt-0 md:px-10 py-3 text-base"
        >
          Check Availability
        </button>
      </form>

      {/* Common Features */}
      <div className="mt-16 space-y-6">
        {roomCommonData.map((spec, index) => (
          <div key={index} className="flex items-start gap-3">
            <img src={spec.icon} alt={spec.title} className="w-6" />
            <div>
              <p className="text-base font-semibold">{spec.title}</p>
              <p className="text-sm text-gray-600">{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hotel Description */}
      <div className="max-w-3xl border-y border-gray-300 my-14 py-10 text-gray-600">
        <p>
          Nestled in the heart of the city, our hotel offers a perfect blend of comfort, elegance, and modern amenities.
          Whether you're traveling for business or leisure, you'll enjoy spacious rooms, exceptional service, and easy
          access to top attractions. Relax by the pool, dine at our rooftop restaurant, and experience true hospitality
          with every stay.
        </p>
      </div>

      {/* Hosted By */}
      <div className="flex flex-col items-start gap-5">
        <div className="flex items-center gap-4">
          <img src={room.hotel.owner?.image} alt="Host" className="h-14 w-14 md:h-18 md:w-18 rounded-full" />
          <div>
            <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
            <div className="flex items-center">
              <StarRating />
              <p className="ml-2 text-sm text-gray-500">200+ reviews</p>
            </div>
          </div>
        </div>
        <button className="px-6 py-2.5 rounded text-white bg-primary hover:bg-primary-dull transition">
          Contact Now
        </button>
      </div>
    </motion.div>
  ) : (
    <div className="flex justify-center items-center min-h-[50vh] text-gray-500">Loading room details...</div>
  );
};

export default RoomDetails;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets';
// import StarRating from '../components/StarRating';
// import { motion } from 'framer-motion';

// const RoomDetails = () => {
//   const { id } = useParams();
//   const [room, setRoom] = useState(null);
//   const [mainImage, setMainImage] = useState(null);

//   useEffect(() => {
//     const selectedRoom = roomsDummyData.find((room) => room._id === id);
//     if (selectedRoom) {
//       setRoom(selectedRoom);
//       setMainImage(selectedRoom.images[0]);
//     }
//   }, [id]);

//   return room ? (
//     <motion.div
//       className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//     >
//       {/* Heading */}
//       <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
//         <h1 className="text-3xl md:text-4xl font-playfair">
//           {room.hotel.name}{' '}
//           <span className="font-inter text-sm">({room.roomType})</span>
//         </h1>
//         <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
//           20% OFF
//         </p>
//       </div>

//       {/* Rating & Address */}
//       <div className="mt-2 space-y-2">
//         <div className="flex items-center">
//           <StarRating />
//           <p className="ml-2 text-sm text-gray-600">200+ reviews</p>
//         </div>
//         <div className="flex items-center gap-2 text-gray-500">
//           <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
//           <span>{room.hotel.address}</span>
//         </div>
//       </div>

//       {/* Main & Thumbnail Images */}
//       <div className="flex flex-col lg:flex-row mt-6 gap-6">
//         <motion.img
//           src={mainImage}
//           alt="Main room"
//           className="w-full rounded-xl shadow-lg object-cover max-h-[450px]"
//           key={mainImage}
//           initial={{ opacity: 0.7, scale: 0.98 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//         />
//         <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
//           {room.images.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               onClick={() => setMainImage(img)}
//               alt="Room thumbnail"
//               className={`w-full h-32 rounded-xl object-cover cursor-pointer transition-all duration-300 hover:scale-105 ${
//                 mainImage === img ? 'outline outline-2 outline-orange-500' : ''
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Highlights + Price */}
//       <div className="flex flex-col md:flex-row md:justify-between mt-10">
//         <div>
//           <h2 className="text-3xl md:text-4xl font-playfair">Experience Luxury Like Never Before</h2>
//           <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
//             {room.amenities.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
//               >
//                 <img className="w-5 h-5" src={facilityIcons[item]} alt={item} />
//                 <p className="text-xs">{item}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//         <p className="text-2xl font-medium mt-4 md:mt-0 text-primary">₹{room.pricePerNight}/night</p>
//       </div>

//       {/* Check-in/Checkout Form */}
//       <form className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-xl p-6 rounded-xl mt-16 max-w-6xl">
//         <div className="flex flex-col md:flex-row gap-6 text-gray-700 w-full">
//           <div>
//             <label htmlFor="checkInDate" className="font-medium">Check In</label>
//             <input type="date" id="checkInDate" className="w-full rounded border px-3 py-2 mt-1" required />
//           </div>
//           <div>
//             <label htmlFor="checkOutDate" className="font-medium">Check Out</label>
//             <input type="date" id="checkOutDate" className="w-full rounded border px-3 py-2 mt-1" required />
//           </div>
//           <div>
//             <label htmlFor="guests" className="font-medium">Guests</label>
//             <input type="number" id="guests" min={1} className="w-20 rounded border px-3 py-2 mt-1" required />
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="bg-primary hover:bg-primary-dull transition-all text-white rounded-md mt-6 md:mt-0 md:px-10 py-3 text-base"
//         >
//           Check Availability
//         </button>
//       </form>

//       {/* Common Features */}
//       <div className="mt-16 space-y-6">
//         {roomCommonData.map((spec, index) => (
//           <div key={index} className="flex items-start gap-3">
//             <img src={spec.icon} alt={spec.title} className="w-6" />
//             <div>
//               <p className="text-base font-semibold">{spec.title}</p>
//               <p className="text-sm text-gray-600">{spec.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Hotel Description */}
//       <div className="max-w-3xl border-y border-gray-300 my-14 py-10 text-gray-600">
//         <p>
//           Nestled in the heart of the city, our hotel offers a perfect blend of comfort, elegance, and modern amenities.
//           Whether you're traveling for business or leisure, you'll enjoy spacious rooms, exceptional service, and easy
//           access to top attractions. Relax by the pool, dine at our rooftop restaurant, and experience true hospitality
//           with every stay.
//         </p>
//       </div>

//       {/* Hosted By */}
//       <div className="flex flex-col items-start gap-5">
//         <div className="flex items-center gap-4">
//           <img src={room.hotel.owner.image} alt="Host" className="h-14 w-14 md:h-18 md:w-18 rounded-full" />
//           <div>
//             <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
//             <div className="flex items-center">
//               <StarRating />
//               <p className="ml-2 text-sm text-gray-500">200+ reviews</p>
//             </div>
//           </div>
//         </div>
//         <button className="px-6 py-2.5 rounded text-white bg-primary hover:bg-primary-dull transition">
//           Contact Now
//         </button>
//       </div>
//     </motion.div>
//   ) : (
//     <div className="flex justify-center items-center min-h-[50vh] text-gray-500">Loading room details...</div>
//   );
// };

// export default RoomDetails;
