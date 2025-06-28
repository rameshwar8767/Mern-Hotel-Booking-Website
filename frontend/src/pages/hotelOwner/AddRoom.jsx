import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  })

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerDay: 0,
    amenities: {
      'Free WiFi': false,
      'Free Breakfast': false,
      'Free Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  })

  return (
    <form className="animate-fadeIn transition-all duration-300 ease-in-out">
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Fill in the details carefully and accurately — room details, pricing, and amenities improve user booking experience."
      />

      {/* Upload Area For Images */}
      <p className="text-gray-800 font-medium mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key} className="cursor-pointer hover:scale-105 transition-transform">
            <img
              className="h-32 w-40 object-cover border border-dashed border-gray-300 rounded-lg opacity-80 hover:opacity-100"
              src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
              alt={`room-${key}`}
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })}
            />
          </label>
        ))}
      </div>

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 font-medium mt-4">Room Type</p>
          <select
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="border border-gray-300 mt-1 rounded p-2 w-full opacity-80 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div>
          <p className="mt-4 text-gray-800 font-medium">
            Price <span className="text-xs font-normal">/day</span>
          </p>
          <input
            type="number"
            placeholder="0"
            min="0"
            className="border border-gray-300 mt-1 rounded p-2 w-28 opacity-80 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            value={inputs.pricePerDay}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerDay: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>

      <p className="text-gray-800 font-medium mt-6">Amenities</p>
      <div className="flex flex-wrap mt-1 text-gray-600 gap-x-6 max-w-xl">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2 my-1">
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
              className="accent-primary scale-110"
            />
            <label htmlFor={`amenities${index + 1}`} className="cursor-pointer text-sm">
              {amenity}
            </label>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-primary hover:bg-opacity-90 text-white px-10 py-2 rounded mt-8 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Add Room
      </button>
    </form>
  )
}

export default AddRoom
