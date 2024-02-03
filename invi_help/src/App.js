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
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/secretin" element={<Signin />} ></Route>
        <Route path="/secretup" element={<Signup />} ></Route>
        <Route path="/newadmin" element={<Newadmin />} ></Route>
        <Route path="/adminlogin" element={<Adminlogin />} ></Route>
      </Routes>
    </BrowserRouter>
    <div className='text-white font-bold fixed bottom-0 m-2 max-md:text-slate-400 max-sm:text-slate-500'>
      Developed by Prashant
    </div>
    </>
  );
}

export default App;
