import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter , Route, Routes , Link} from "react-router-dom"
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Register from './screens/Register';
import Login from './screens/Login';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      <Routes>
       <Route path='/home' element={<Homescreen/>} />
       <Route path='/book/:roomid' element={<Bookingscreen/>} />
       <Route path='/register' element={<Register/>} />
       <Route path='/login' element={<Login/>} />
      </Routes>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
