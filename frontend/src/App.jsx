import Navbar from './components/Navbar'
import { Routes, useLocation,Route } from 'react-router-dom'
import HomePage from './pages/HomePage';

const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes("owner");
  
  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>

      </div>
    </div>
  );
};

export default App;
