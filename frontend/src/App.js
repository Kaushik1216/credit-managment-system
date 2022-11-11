
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home'
import {Route,Routes} from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar/>
    <div id="app">
    <Routes>
        <Route path="/" element={<Home/>}></Route>
    </Routes>
    </div>
    </>
  );
}

export default App;
