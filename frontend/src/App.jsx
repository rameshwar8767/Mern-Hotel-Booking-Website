import Navbar from './components/Navbar'
import { Routes, useLocation,Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';

const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes("owner");
  
  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/rooms" element={<AllRooms/>} />
          <Route path="/rooms/:id" element={<RoomDetails/>} />
        </Routes>

      </div>
      <Footer/>
    </div>
  );
};

export default App;
