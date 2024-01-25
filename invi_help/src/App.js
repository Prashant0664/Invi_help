import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/signin" element={<Signin />} ></Route>
        <Route path="/signup" element={<Signup />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;