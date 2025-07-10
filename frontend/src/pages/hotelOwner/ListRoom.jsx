import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken } = useAppContext();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms/owner', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message || 'Failed to load rooms');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error fetching rooms');
    }
  };

  const toggleAvailability = async (roomId) => {
    try {
      const { data } = await axios.patch(
        '/api/rooms/toggle',
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || 'Availability updated');
        setRooms((prev) =>
          prev.map((room) =>
            room._id === roomId
              ? { ...room, isAvailable: !room.isAvailable }
              : room
          )
        );
      } else {
        toast.error(data.message || 'Failed to update availability');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="px-4 py-10">
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />
      <p className="text-gray-600 text-lg mt-8 font-medium">All Rooms</p>

      <div className="w-full max-w-6xl border border-gray-200 rounded-xl overflow-y-auto shadow-md mt-4 transition-all duration-300">
        <table className="w-full text-left">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-5 text-gray-800 font-semibold">Room Type</th>
              <th className="py-3 px-5 text-gray-800 font-semibold max-sm:hidden">Amenities</th>
              <th className="py-3 px-5 text-gray-800 font-semibold">Price / Day</th>
              <th className="py-3 px-5 text-gray-800 font-semibold text-center">Available</th>
            </tr>
          </thead>

          <tbody className="text-sm transition-all">
            {rooms.map((room) => (
              <tr
                key={room._id}
                className="hover:bg-gray-50 transition-colors duration-200 border-t border-gray-200"
              >
                <td className="py-3 px-5 text-gray-700">{room.roomType}</td>
                <td className="py-3 px-5 text-gray-700 max-sm:hidden">
                  {room.amenities.join(', ')}
                </td>
                <td className="py-3 px-5 text-gray-700">₹{room.pricePerDay}</td>
                <td className="py-3 px-5 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={room.isAvailable}
                      onChange={() => toggleAvailability(room._id)}
                    />
                    <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300" />
                    <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-5" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
