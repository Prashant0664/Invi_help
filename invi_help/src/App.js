import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';
import Newadmin from './Newadmin';
import Adminlogin from './Adminlogin';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/secretin" element={<Signin />} ></Route>
        <Route path="/secretup" element={<Signup />} ></Route>
        <Route path="/newadmin" element={<Newadmin />} ></Route>
        <Route path="/adminlogin" element={<Adminlogin />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;