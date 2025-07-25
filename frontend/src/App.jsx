
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HotelReg from './components/HotelReg';

import HomePage from './pages/HomePage';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';

import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';

import { useAppContext } from './context/AppContext';
import Loader from './components/Loader';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';

const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes('/owner');
  const { showHotelRegister } = useAppContext();

  return (
    <div>
      <Toaster />
      
      {!isOwnerPath && <Navbar />}
      {showHotelRegister && <HotelReg />}

      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/experience" element={<ExperiencePage/>} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
           <Route path="/loader/:nextUrl" element={<Loader/>} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;

