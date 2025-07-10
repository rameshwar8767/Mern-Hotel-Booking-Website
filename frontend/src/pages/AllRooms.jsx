import React, { useMemo, useState } from 'react';
import { assets, facilityIcons } from '../assets/assets';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useAppContext } from '../context/AppContext';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm transition-all duration-300 hover:scale-[1.01]">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
      className="accent-blue-500 cursor-pointer"
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm transition-all duration-300 hover:scale-[1.01]">
    <input
      type="radio"
      checked={selected}
      name="sortOption"
      onChange={() => onChange(label)}
      className="accent-blue-500 cursor-pointer"
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, navigate, currency } = useAppContext();

  const [selectedFilters, setSelectedFilters] = useState({
    roomTypes: [],
    priceRanges: [],
  });
  const [selectedSort, setSelectedSort] = useState('');
  const [openFilters, setOpenFilters] = useState(false);

  const roomTypes = [
    'Single Bed',
    'Double Bed',
    'Luxury Room',
    'Family Suite',
  ];

  const priceRanges = [
    'Below ₹1000',
    '₹1000 - ₹2500',
    '₹2500 - ₹5000',
    '₹5000 - ₹10000',
    'Above ₹10000',
  ];

  const sortOptions = [
    'Price Low to High',
    'Price High to Low',
    'Newest First',
  ];

  const parsePriceRange = (range) => {
    if (range.includes('Below')) return [0, 1000];
    if (range.includes('Above')) return [10000, Infinity];
    const match = range.match(/₹?(\d+)\s*-\s*₹?(\d+)/);
    return match ? [parseInt(match[1]), parseInt(match[2])] : [0, Infinity];
  };

  const matchesRoomType = (room) =>
    selectedFilters.roomTypes.length === 0 ||
    selectedFilters.roomTypes.includes(room.roomType);

  const matchesPriceRange = (room) =>
    selectedFilters.priceRanges.length === 0 ||
    selectedFilters.priceRanges.some((range) => {
      const [min, max] = parsePriceRange(range);
      return room.pricePerDay >= min && room.pricePerDay <= max;
    });

  const matchesDestination = (room) => {
    const dest = searchParams.get('destination')?.toLowerCase();
    return !dest || room.hotel.city?.toLowerCase().includes(dest);
  };

  const filteredRooms = useMemo(() => {
    const filtered = rooms.filter(
      (room) =>
        matchesRoomType(room) &&
        matchesPriceRange(room) &&
        matchesDestination(room)
    );

    return [...filtered].sort((a, b) => {
      if (selectedSort === 'Price Low to High') return a.pricePerDay - b.pricePerDay;
      if (selectedSort === 'Price High to Low') return b.pricePerDay - a.pricePerDay;
      if (selectedSort === 'Newest First') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (checked) {
        updated[type] = [...updated[type], value];
      } else {
        updated[type] = updated[type].filter((v) => v !== value);
      }
      return updated;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({ roomTypes: [], priceRanges: [] });
    setSelectedSort('');
    setSearchParams({});
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 px-4 md:px-16 lg:px-24 gap-8">
      {/* Room List */}
      <div className="flex-1 w-full">
        <div className="mb-6">
          <h1 className="font-playfair text-4xl">Hotel Rooms</h1>
          <p className="text-sm text-gray-500 mt-2">
            Explore our rooms with premium facilities and perfect destinations.
          </p>
        </div>

        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row py-10 gap-6 border-b border-gray-300 last:border-0 group"
          >
            <img
              src={room.images[0]}
              alt=""
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                window.scrollTo(0, 0);
              }}
              className="w-full md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer hover:scale-105 transition-all"
            />
            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">{room.hotel.city}</p>
              <p
                className="text-2xl font-playfair text-gray-800 hover:underline cursor-pointer"
                onClick={() => navigate(`/rooms/${room._id}`)}
              >
                {room.hotel.name}
              </p>
              <div className="flex items-center">
                <StarRating /> <span className="ml-2 text-sm">200+ reviews</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <img src={assets.locationIcon} alt="location" className="w-4" />
                <span>{room.hotel.address}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {room.amenities.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded text-sm"
                  >
                    <img src={facilityIcons[a]} alt={a} className="w-4 h-4" />
                    {a}
                  </div>
                ))}
              </div>
              <p className="text-xl font-semibold text-gray-800 mt-3">
                ₹{room.pricePerDay} / day
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Sidebar */}
      <div className="w-full lg:w-80 border border-gray-200 rounded-lg shadow">
        <div className="px-5 py-3 bg-gray-50 border-b flex justify-between items-center">
          <p className="font-semibold text-gray-800">FILTERS</p>
          <span
            onClick={clearAllFilters}
            className="text-xs text-red-500 cursor-pointer hover:underline"
          >
            CLEAR
          </span>
        </div>
        <div className={`px-5 py-4 space-y-5`}>
          <div>
            <p className="font-medium text-gray-800">Room Types</p>
            {roomTypes.map((room, i) => (
              <CheckBox
                key={i}
                label={room}
                selected={selectedFilters.roomTypes.includes(room)}
                onChange={(checked) => handleFilterChange(checked, room, 'roomTypes')}
              />
            ))}
          </div>
          <div>
            <p className="font-medium text-gray-800">Price Range</p>
            {priceRanges.map((range, i) => (
              <CheckBox
                key={i}
                label={range}
                selected={selectedFilters.priceRanges.includes(range)}
                onChange={(checked) => handleFilterChange(checked, range, 'priceRanges')}
              />
            ))}
          </div>
          <div>
            <p className="font-medium text-gray-800">Sort By</p>
            {sortOptions.map((option, i) => (
              <RadioButton
                key={i}
                label={option}
                selected={selectedSort === option}
                onChange={setSelectedSort}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
