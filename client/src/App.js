import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter , Route, Routes , Link} from "react-router-dom"
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Register from './screens/Register';
import Login from './screens/Login';
import Profilescreen from './screens/Profilescreen';
import Adminscreens from './screens/Adminscreens';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      <Routes>
       <Route path='/home' element={<Homescreen/>} />
       <Route path='/book/:roomid/:fromdate/:todate' element={<Bookingscreen/>} />
       <Route path='/register' element={<Register/>} />
       <Route path='/login' element={<Login/>} />
       <Route path='/profile' element={<Profilescreen />} />
       <Route path='/admin' element={<Adminscreens />} />
       <Route path='/' element={<Landingscreen />} />
      
      </Routes>
       
      </BrowserRouter>
    </div>
  );
}

export default App;




