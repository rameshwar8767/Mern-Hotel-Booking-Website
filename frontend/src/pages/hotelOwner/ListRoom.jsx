import React, { useState } from 'react';
import { roomsDummyData } from '../../assets/assets';
import Title from '../../components/Title';

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);

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
              <th className="py-3 px-5 text-gray-800 font-semibold">Name</th>
              <th className="py-3 px-5 text-gray-800 font-semibold max-sm:hidden">Facility</th>
              <th className="py-3 px-5 text-gray-800 font-semibold">Price / Day</th>
              <th className="py-3 px-5 text-gray-800 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm transition-all">
            {rooms.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200 border-t border-gray-200"
              >
                <td className="py-3 px-5 text-gray-700">{item.roomType}</td>
                <td className="py-3 px-5 text-gray-700 max-sm:hidden">
                  {item.amenities.join(', ')}
                </td>
                <td className="py-3 px-5 text-gray-700">₹{item.pricePerNight}</td>
                <td className="py-3 px-5 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                      readOnly // avoids React warning for controlled component
                    />
                    <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
                    <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-5"></span>
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
