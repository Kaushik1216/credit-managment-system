
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Register from './components/form/Register'
import Login from './components/form/Login'
import Course from './components/course/Course'
import {Route,Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [user,setuser]=useState("");
  const [loginmsg,setloginmsg]=useState("");
  const luser =(x)=>{
    if(user===""){
      setuser(x);
    }else{
      setuser("");
    }
  }
  useEffect(()=>{
const data=window.localStorage.getItem("loginuser");
if(data!=null) setuser(JSON.parse(data));
  },[])
  useEffect(()=>{
    window.localStorage.setItem("loginuser",JSON.stringify(user))
  },[user])
  const lmsg=(x)=>{
    setloginmsg(x);
  }
  return (
    <>
    <Navbar user={user}/>
    <div id="app">
    <Routes>
        <Route path="/" element={<Home loginmsg={loginmsg} user={user}/>}></Route>
        <Route path="/signin" element={<Register/>}></Route>
        <Route path="/login" element={<Login luser={luser} lmsg={lmsg}/>}></Route>
        <Route path="/course" element={<Course user={user}/>}></Route>
        {/* <Route path="/" element={<Navigate replace to="/login"/>}></Route> */}
    </Routes>
    </div>
    </>
  );
}

export default App;
