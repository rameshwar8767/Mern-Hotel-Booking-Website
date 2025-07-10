import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets} from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import { useEffect } from 'react'

const Dashboard = () => {

  const {currency,user,getToken,toast,axios,} = useAppContext()

  const [dashboardData, setDashboardData] = useState({
    bookings:[],
    totalBookings:0,
    totalRevenue:0,
  })

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner',{headers: {
        Authorization: `Bearer ${await getToken()}`
      }})
      if (data.success) {
        setDashboardData(data.dashboardData);
        toast.success(data.message || "Dashboard data loaded successfully");
      } else {
        toast.error(data.message || "Failed to load dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
      
    }
  }

  useEffect(()=>{
    if(user){
      fetchDashboardData();
    }
  },[user])

  return (
    <div className="animate-fadeIn transition-all duration-300 ease-in-out">
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings, and analyze revenue — all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      {/* Summary Cards */}
      <div className="flex flex-wrap gap-6 my-8">
        {/* Total Bookings */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg flex items-center p-4 pr-8 shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-1/2 md:w-1/3">
          <img src={assets.totalBookingIcon} alt="Bookings" className="hidden sm:block h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-500 text-base">{dashboardData.totalBookings}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-green-50 border border-green-100 rounded-lg flex items-center p-4 pr-8 shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-1/2 md:w-1/3">
          <img src={assets.totalRevenueIcon} alt="Revenue" className="hidden sm:block h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-green-600 text-lg">Total Revenue</p>
            <p className="text-neutral-500 text-base">₹ {dashboardData.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-xl text-blue-950/80 font-semibold mb-4">Recent Bookings</h2>

      <div className="w-full max-w-4xl border border-gray-300 rounded-lg max-h-80 overflow-y-auto shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-semibold">User Name</th>
              <th className="py-3 px-4 text-gray-800 font-semibold max-sm:hidden">Room Name</th>
              <th className="py-3 px-4 text-gray-800 font-semibold text-center">Total Amount</th>
              <th className="py-3 px-4 text-gray-800 font-semibold text-center">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.bookings.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-all">
                <td className="py-3 px-4 text-gray-700 border-t border-gray-200">{item.user.username}</td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-200 max-sm:hidden">{item.room.roomType}</td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-200 text-center">₹ {item.totalPrice}</td>
                <td className="py-3 px-4 border-t border-gray-200 text-center">
                  <span
                    className={`py-1 px-3 text-xs rounded-full font-medium ${
                      item.isPaid
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {item.isPaid ? 'Completed' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
