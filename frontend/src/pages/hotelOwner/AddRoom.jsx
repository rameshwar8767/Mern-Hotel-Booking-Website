import React, { useState } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerDay: '',
    amenities: {
      'Free WiFi': false,
      'Free Breakfast': false,
      'Free Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const selectedImages = Object.values(images).filter((img) => img);
    if (!inputs.roomType || !inputs.pricePerDay || selectedImages.length < 1) {
      toast.error('Please fill all the fields and upload at least one image.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('roomType', inputs.roomType);
      formData.append('pricePerDay', inputs.pricePerDay);

      const selectedAmenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append('amenities', JSON.stringify(selectedAmenities));

      selectedImages.forEach((file) => {
        formData.append('images', file);
      });

      // Debug log
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      const { data } = await axios.post('/api/rooms', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success(data.message || 'Room added successfully');

        // Reset form
        setImages({ 1: null, 2: null, 3: null, 4: null });
        setInputs({
          roomType: '',
          pricePerDay: '',
          amenities: {
            'Free WiFi': false,
            'Free Breakfast': false,
            'Free Service': false,
            'Mountain View': false,
            'Pool Access': false,
          },
        });
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="animate-fadeIn transition-all duration-300 ease-in-out"
    >
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Fill in the details carefully and accurately — room details, pricing, and amenities improve user booking experience."
      />

      {/* Upload Area */}
      <p className="text-gray-800 font-medium mt-10">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label
            htmlFor={`roomImage${key}`}
            key={key}
            className="cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              className="h-32 w-40 object-cover border border-dashed border-gray-300 rounded-lg opacity-80 hover:opacity-100"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt={`room-${key}`}
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      {/* Room Info */}
      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 font-medium mt-4">Room Type</p>
          <select
            value={inputs.roomType}
            onChange={(e) =>
              setInputs({ ...inputs, roomType: e.target.value })
            }
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
              setInputs({
                ...inputs,
                pricePerDay: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* Amenities */}
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
            <label
              htmlFor={`amenities${index + 1}`}
              className="cursor-pointer text-sm"
            >
              {amenity}
            </label>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary hover:bg-opacity-90 text-white px-10 py-2 rounded mt-8 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Room'}
      </button>
    </form>
  );
};

export default AddRoom;
