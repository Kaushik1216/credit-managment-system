
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Register from './components/form/Register'
import Login from './components/form/Login'
import {Route,Routes} from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar/>
    <div id="app">
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signin" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </div>
    </>
  );
}

export default App;
